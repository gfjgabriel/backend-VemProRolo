
import { AuthConfig } from '../auth/auth.config';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import { AuthDto } from 'src/entities/dtos/auth/auth.dto';
import { ConfirmationCodeDto } from 'src/entities/dtos/auth/confirmation-code.dto';
import { RegisterDto } from 'src/entities/dtos/auth/register.dto';
import { ResetPasswordDto } from 'src/entities/dtos/auth/reset-password.dto';
import { UserEmailDto } from 'src/entities/dtos/user/user-email.dto';
import { ErrorConstants } from 'src/utils/error-constants.enum';
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
        return this.userPool.signUp(email, password, [new CognitoUserAttribute({ Name: 'name', Value: name })], null, (error, result) => {

            resolve(result.user);

        });
      })).then(() => this.userService.createUser(authRegisterRequest));
    }

    async verifyEmail(confirmationCodeDto: ConfirmationCodeDto) {
      const { code, email } = confirmationCodeDto;
      console.log(code, email);
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.confirmRegistration(code, true, (err, result) => {
            resolve(result.user);
        });
      })
      .then(() => this.userService.verifyUserEmail(email));      
    }

    async resendConfirmationCode(dto: UserEmailDto) {
      const { email } = dto;
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
      var cognitoUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return cognitoUser.resendConfirmationCode((err, result) => {
          if (!result) {
            console.log(err)
            reject(err);
          } else {
            resolve(result.user);
          }
        });
      });      
    }

    async sendForgotPasswordEmail(dto: UserEmailDto) {
      const { email } = dto;
      let isEmailVerified = await this.userService.isUserEmailverified(email);
      console.log(isEmailVerified);
      if (!isEmailVerified) {
        console.log("cheguei no erro")
        throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
      }
      console.log(email)
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

    async authenticateUser(user: AuthDto) {
      const { email, password } = user;
      let isEmailVerified = await this.userService.isUserEmailverified(email);
      if (!isEmailVerified) {
        throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
      }
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
            console.log(err);
            reject(err.message);
          },
        });
      });
    }
}
