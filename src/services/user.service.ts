import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { isEmail } from 'class-validator';
import { AuthDto } from 'src/entities/dtos/auth/auth.dto';
import { ResetPasswordDto } from 'src/entities/dtos/auth/reset-password.dto';
import { UserCreateDto } from 'src/entities/dtos/user/create-user.dto';
import { ErrorConstants } from 'src/utils/error-constants.enum';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CognitoService } from './cognito.service';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly cognito: CognitoService
  ) {}

  createUser(userCreateDto: UserCreateDto): Promise<User> {
    console.log(userCreateDto);
    userCreateDto.password = bcrypt.hashSync(userCreateDto.password, parseInt(process.env.SALT_ROUNDS, 10));
    return this.userRepository.save(userCreateDto);
  }

  verifyUserEmail(email: string) {
    new Promise((resolve, reject) => {
      this.userRepository.findOne({ email })
      .then(
        it => {
          if (!it) {
            reject(it);
          } else {
            it.isEmailVerified = true;
            this.userRepository.save(it);
            resolve(it);
          }
        }
      );
    });
  }

  async isUserEmailverified(email: string) {
      return this.userRepository.findOne({ email })
      .then(
        it => {
          if (!it) {
            throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
          } else {
            return it.isEmailVerified;
          }
        }
      );
  }

  async updatePassword(dto: ResetPasswordDto) {
    const { email, password } = dto;
    var user = await this.findOneByEmail(email);
    user.password = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS, 10));
    return this.userRepository.save(user);
  }

  findOneByEmailAndPassword(authDto: AuthDto): Promise<User> {
    console.log(authDto);
    const email = authDto.email;
    var user = this.userRepository.findOne({ email }).then(
      it => {
        if (it === undefined) {
          throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (bcrypt.compareSync(authDto.password, it.password)) {
          return it;
        } else {
          throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
      }
    );
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      return this.userRepository.findOne({ email }).then(
        it => {
          /*if (it === undefined) {
            throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
          }*/
          if (!it) {
            reject(it);
          } else {
            resolve(it);
          }
        }
      );
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getCurrentUser(): Promise<User> {
    var cognitoUser = this.cognito.loadCurrentUser();
    var email = cognitoUser.UserAttributes.find(it => it.Name == "email").Value;
    return await this.findOneByEmail(email)
  }

}