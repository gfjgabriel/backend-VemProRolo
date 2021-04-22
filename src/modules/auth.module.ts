import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PassportModule],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy]
})
export class AuthModule {}
