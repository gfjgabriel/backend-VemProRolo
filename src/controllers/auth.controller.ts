import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/services/auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('auth')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
       
    }

    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}