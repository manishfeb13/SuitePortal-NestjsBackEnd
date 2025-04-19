import { Controller, Get, Post, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    @Get()
    helloworld():string{
        return 'Hello World from Admin Section'
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() userLoginDetails:LoginDto){
        return await this.adminService.login(userLoginDetails);
    }

    @Post('refresh')
    @UsePipes(new ValidationPipe())
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto){
        return await this.adminService.refreshTokens(refreshTokenDto);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() newUserRegister: AdminDto){
        return await this.adminService.register(newUserRegister);
        }
    }
