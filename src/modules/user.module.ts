import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { UserFacade } from 'src/facade/user.facade';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserFacade],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User]), UserService]
})
export class UserModule {}