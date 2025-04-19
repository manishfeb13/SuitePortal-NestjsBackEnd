import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { AuthDao } from './auth.dao';
import { RefreshTokenDto } from 'src/admin/dto/refresh-token.dto';
import { AccessRefreshTokensDto } from 'src/admin/dto/acess-refresh-tokens.dto';

@Injectable()
export class AuthService {
    constructor(private JwtService: JwtService, private authDao: AuthDao){};

    async convertToHash(rawPassword: string){
        const saltOrRounds = 13; // Round refers to: 2 power 13 times the string will be hashed. This slows the process making difficult for attackers.
        const hash = await bcrypt.hash(rawPassword, saltOrRounds) //salt -random string is automatically attached to passString by bcrypt and returned hashed string is prepended with salt so that it helps later in compairing.
        return hash
    }

    async comparePasswordToHash(rawPassword: string, hash:string):Promise<boolean>{
        return await bcrypt.compare(rawPassword, hash);
    }

    async VerifyRefreshTokens(refreshTokenDto:RefreshTokenDto) : Promise<RefreshTokenDto>{  
        const storedRefreshtoken =  await this.authDao.findRefreshToken(refreshTokenDto.refresh_token)
        return storedRefreshtoken
    }

    async generateJwtToken(payload): Promise<AccessRefreshTokensDto>{
        const token = await this.JwtService.signAsync(payload);
        const random_refresh_token_string = uuidv4()
        console.log('New Jwt generated: ', token, ' refresh token: ', random_refresh_token_string, 'user_id: ', payload.sub)
        await this.authDao.storeRefreshToken(random_refresh_token_string, payload.sub); //sub is the user id.
        return {
            access_token: token,
            refresh_token: random_refresh_token_string
        };
    }
}
