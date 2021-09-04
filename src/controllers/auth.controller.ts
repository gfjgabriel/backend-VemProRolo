import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthDto } from "src/entities/dtos/auth/auth.dto";
import { ConfirmationCodeDto } from "src/entities/dtos/auth/confirmation-code.dto";
import { RegisterDto } from "src/entities/dtos/auth/register.dto";
import { ResetPasswordDto } from "src/entities/dtos/auth/reset-password.dto";
import { UserEmailDto } from "src/entities/dtos/user/user-email.dto";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
       
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }

    @Post('register')
    async register(@Body() authenticateRequest: RegisterDto) {
        try {
            console.log(authenticateRequest)
            return await this.authService.register(authenticateRequest);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('login')
    async login(@Body() authenticateRequest: AuthDto) {
        return await this.authService.authenticateUser(authenticateRequest);
    }

    @Post('verify-email')
    async verifyEmail(@Body() confirmationCode: ConfirmationCodeDto) {
        try {
            return await this.authService.verifyEmail(confirmationCode);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('resend-code')
    async resendConfirmationCode(@Body() dto: UserEmailDto) {
        try {
            return await this.authService.resendConfirmationCode(dto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('password-recovery')
    async sendForgotPasswordEmail(@Body() dto: UserEmailDto) {
        return await this.authService.sendForgotPasswordEmail(dto);
    }

    @Post('reset-password')
    async resetPasswordWithCodeVerification(@Body() dto: ResetPasswordDto) {
        try {
            return await this.authService.resetPasswordWithCodeVerification(dto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}