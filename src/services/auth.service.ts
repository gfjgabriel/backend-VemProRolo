
import { AuthConfig } from '../auth/auth.config';
import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,

} from 'amazon-cognito-identity-js';
import { AuthDto } from 'src/entities/dtos/auth/auth.dto';
import { ConfirmationCodeDto } from 'src/entities/dtos/auth/confirmation-code.dto';
import { RegisterDto } from 'src/entities/dtos/auth/register.dto';
import { UserSimpleDto } from 'src/entities/dtos/user/user-simple.dto';
import { isEmail } from 'class-validator';
import { ResetPasswordDto } from 'src/entities/dtos/auth/reset-password.dto';
@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
    constructor(
      private userService: UserService,
      @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
      ) {
        this.userPool = new CognitoUserPool({
          UserPoolId: this.authConfig.userPoolId,
          ClientId: this.authConfig.clientId,
        });
      }

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.userService.findOne(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    googleLogin(req) {
      if (!req.user) {
        return 'No user for Google';
      }
      return {
        message: 'User Info from Google',
        user: req.user
      }
    }

    async register(authRegisterRequest: RegisterDto) {
      const { name, email, password } = authRegisterRequest;
      return new Promise(((resolve, reject) => {
        return this.userPool.signUp(email, password, [new CognitoUserAttribute({ Name: 'name', Value: name })], null, (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        });
      })).then(() => this.userService.createUser(authRegisterRequest));
    }

    async verifyEmail(confirmationCodeDto: ConfirmationCodeDto) {
      const { code, email } = confirmationCodeDto;
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        });
      })
      .then(() => this.userService.verifyUserEmail(email));      
    }

    async resendConfirmationCode(email: string) {
      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.resendConfirmationCode((err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        });
      });      
    }

    async sendForgotPasswordEmail(email: string) {
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.forgotPassword({
          onSuccess: result => {
            resolve(result);
          },
          onFailure: err => {
            reject(err);
          }
        });
      });      
    }

    async resetPasswordWithCodeVerification(dto: ResetPasswordDto) {
      const { email, code, password } = dto;
      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.confirmPassword(code, password, {
          onSuccess: () => {
            resolve('ok');
          },
          onFailure: err => {
            reject(err);
          },
        });
      })
      .then(() => this.userService.updatePassword(dto));
    }

    authenticateUser(user: AuthDto) {
      const { email, password } = user;
      
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
  
      const newUser = new CognitoUser(userData);
  
      return new Promise((resolve, reject) => {
        return newUser.authenticateUser(authenticationDetails, {
          onSuccess: result => {
            resolve(result);
          },
          onFailure: err => {
            reject(err);
          },
        });
      });
    }
}
