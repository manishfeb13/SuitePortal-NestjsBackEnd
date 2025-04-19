import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaintenanceRequestModule } from './maintenance-request/maintenance-request.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  // MongoDB URI here ######################################################33
  imports: [MaintenanceRequestModule, AdminModule, MongooseModule.forRoot('mongodb+srv://downloadyourcourse:1GYbeiYYXDOpN7M0@suiteportal-db-us-centr.nywljgt.mongodb.net/suitePortal_db?retryWrites=true&w=majority&appName=SuitePortal-db-us-central1-lowa'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
