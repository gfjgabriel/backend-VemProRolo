import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: '489733260344-dp8nr0ln99226578kgucmm062jsbc44c.apps.googleusercontent.com',
            clientSecret: 'gX4H2ynOlbEifqHBva4sG3Tm',
            callBackURL: 'http://localhost:3333/auth/google/callback',
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback ): Promise<any> {
        const { username, name, emails, photos } = profile;
        console.log(username, name.givenName, name.familyName, emails[0].value, accessToken, refreshToken);

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        
        done(null, user);
    }
}