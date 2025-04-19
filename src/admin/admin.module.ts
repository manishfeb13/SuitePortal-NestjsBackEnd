import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminDao } from './admin.dao';
import { AdminDetails, AdminDetailsSchema } from 'src/schemas/adminDetails.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/refreshToken.schema';

@Module({
  imports:[AuthModule ,MongooseModule.forFeature([{
    name: AdminDetails.name,
    schema: AdminDetailsSchema
  }])],
  controllers: [AdminController],
  providers: [AdminService, AdminDao]
})
export class AdminModule {}


