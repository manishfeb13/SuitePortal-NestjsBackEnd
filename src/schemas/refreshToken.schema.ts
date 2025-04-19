import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class RefreshToken {
    

    @Prop({unique: true, required:true, type:mongoose.Types.ObjectId })
    user_id: mongoose.Types.ObjectId;
    @Prop({required:true})
    refresh_token: string;
    @Prop({required:true})
    expiry_date: Date
}


export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)