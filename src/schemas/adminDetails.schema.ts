import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AdminDetails {
    @Prop({required:true})
    name: string;

    @Prop({unique: true, required:true})
    email: string;

    @Prop({required:true})
    jobRole: string;

    @Prop({required:true})
    phoneNo: Number;

    @Prop({required:true})
    address: string;

    @Prop({required:true})
    age: Number;

    @Prop({required:true})
    password: string;
}


export const AdminDetailsSchema = SchemaFactory.createForClass(AdminDetails)