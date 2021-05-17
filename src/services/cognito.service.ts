import { Inject, Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AuthConfig } from 'src/auth/auth.config';

@Injectable()
export class CognitoService {
    private client: CognitoIdentityServiceProvider
    protected user: GetUserResponse
    constructor(@Inject('AuthConfig')
    private readonly authConfig: AuthConfig,) {
        
        this.client = new CognitoIdentityServiceProvider({
            region: this.authConfig.region
        })
    }
    public async getUserByToken(token: string): Promise<GetUserResponse> {
        this.user = await this.client.getUser({
            AccessToken: token
        }).promise()
        console.log(this.user);
        return this.user
    }
    public loadCurrentUser(): GetUserResponse {
        return this.user
    }
}