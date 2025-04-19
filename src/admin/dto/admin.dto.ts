import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, max, MinLength, minLength } from "class-validator";

export class AdminDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    jobRole: string;

    // @IsNumber()
    @MinLength(5)
    @IsNotEmpty()
    phoneNo: Number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    age: Number;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password?: string;  //passowrd optional when sending the dto object last checked by admin in the resolution state of the maintainence request.
}



    