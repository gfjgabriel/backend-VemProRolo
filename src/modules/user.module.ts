import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { UserFacade } from 'src/facade/user.facade';
import { CognitoService } from 'src/services/cognito.service';
import { ConfigService } from 'aws-sdk';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserFacade, CognitoService, AuthConfig],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User]), UserService, CognitoService]
})
export class UserModule {}