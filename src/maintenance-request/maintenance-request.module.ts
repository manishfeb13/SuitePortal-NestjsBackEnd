import { Module } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance-request.service';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceRequest, MaintenanceRequestSchema } from 'src/schemas/maintenanceRequest.schema';
import { AdminModule } from 'src/admin/admin.module';
import { MaintenanceRequestDao } from './maintenance-request.dao';



@Module({
  imports:[AdminModule,
    MongooseModule.forFeature([{
    name: MaintenanceRequest.name,
    schema: MaintenanceRequestSchema
  }])],
  providers: [MaintenanceRequestService, MaintenanceRequestDao],
  controllers: [MaintenanceRequestController]
})
export class MaintenanceRequestModule {}
