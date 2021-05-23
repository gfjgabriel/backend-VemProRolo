import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { AuthConfig } from 'src/auth/auth.config';
import { CognitoService } from 'src/services/cognito.service';
import { AuthorizerGuard } from 'src/auth/guards/cognito.guard';

@Module({
  imports: [UserModule, PassportModule],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, AuthConfig]
})
export class AuthModule {}
