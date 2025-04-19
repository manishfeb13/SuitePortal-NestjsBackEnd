import { BadRequestException, Body, Controller, Post, Get, Param, Put, UsePipes, ValidationPipe, UseGuards, Patch, HttpException } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance-request.service';
import { createMaintenanceRequestDto } from './dto/maintenanceRequest.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import mongoose from 'mongoose';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService) {}

  @Post('/')
  @UsePipes(new ValidationPipe()) 
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: createMaintenanceRequestDto,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }


  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllMaintainenceRequest(){
    return await this.maintenanceRequestService.getAllMaintenanceRequest()
  }


  @Patch('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id: string, @Body() markedByadmin) 
  {

    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id',400);

    const updatedValue = await this.maintenanceRequestService.closeMaintenanceRequest(id, markedByadmin);

    if(!updatedValue) throw new HttpException('User Not Found', 404) //when user id is correct but no user exists for that id.

    console.log('id: ',id,' isValid: ', isValid, ' upDated Value: ',updatedValue)

    return updatedValue
    
  }


//   @Get('/:id')
//   public async getMaintenanceRequest(
//     @Param('id') id: string
//   ) 
//   {

//     if (!id) {
//       throw new BadRequestException('No id provided');
//     }
//     return await this.maintenanceRequestService.getMaintenanceRequest(id);
//   }

}

