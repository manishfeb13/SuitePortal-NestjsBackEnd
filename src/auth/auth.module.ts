import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/refreshToken.schema';
import { AuthDao } from './auth.dao';


@Module({
  imports:[JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '300s' },
  }),
  MongooseModule.forFeature([{
    name: RefreshToken.name,
    schema: RefreshTokenSchema
  }])],
  providers: [AuthService, AuthDao],
  exports:[AuthService]
})
export class AuthModule {}
