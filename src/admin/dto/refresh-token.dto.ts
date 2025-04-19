import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    refresh_token: string;

    @IsOptional()
    user_id ?: mongoose.Types.ObjectId;
    
    @IsOptional()
    expiry_date ?: Date
}