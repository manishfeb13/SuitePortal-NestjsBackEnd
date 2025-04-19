import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenDto } from 'src/admin/dto/refresh-token.dto';
import { RefreshToken } from 'src/schemas/refreshToken.schema';




@Injectable()
export class AuthDao {

constructor(@InjectModel(RefreshToken.name) private refreshTokenModel : Model<RefreshToken>) {}

async storeRefreshToken(refresh_token, user_id){
    //expiry date of refresh token will be 3 days from current date.
    const expiry_date = new Date;
    expiry_date.setDate(expiry_date.getDate() + 3);
    await this.refreshTokenModel.updateOne(
        {user_id: user_id},
        {$set: {refresh_token, expiry_date} },
        {upsert: true}
    )
    return
}

async findRefreshToken(refresh_token: string){
    return await this.refreshTokenModel.findOne({'refresh_token':refresh_token, expiry_date:{$gte : new Date()}});
}

 }


