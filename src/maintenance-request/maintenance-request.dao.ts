import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from 'src/schemas/maintenanceRequest.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createMaintenanceRequestDto } from './dto/maintenanceRequest.dto';


@Injectable()
export class MaintenanceRequestDao {

constructor(@InjectModel(MaintenanceRequest.name) private maintainenceRequestModel : Model<MaintenanceRequest>) {}


  async insertNewRequest(currentMaintenanceRequest: createMaintenanceRequestDto) {
    const newMaintainenveRequest = await new this.maintainenceRequestModel(currentMaintenanceRequest);
    return await newMaintainenveRequest.save()
  }

  async getAllMaintenanceRequest(): Promise<createMaintenanceRequestDto[]> {
    return await this.maintainenceRequestModel.find();
  }

  async closeMaintenanceRequest(id: string, newResolutionState): Promise<createMaintenanceRequestDto> {
    return await this.maintainenceRequestModel.findByIdAndUpdate(id, {resolutionState: newResolutionState}, { new:true})
        //By default the findByIdAndUpdate doesn't return anything. The third param {new: true}, will make the function return the
        //new updated value of the user. The third param is optional.
  }

  async getMaintenanceRequest(id: string): Promise<createMaintenanceRequestDto> {
    return await this.maintainenceRequestModel.findById(id);
  }

  // async closeMaintenanceRequest(id: string, markedByAdmin): Promise<MaintenanceRequestDB> {
    
  //   let list_requests = await this.collection.value();
  //   console.log(list_requests,'11111')

  //   let updated_list_requests = await list_requests.map(request => {
  //     if(request.id !== id){return request}
  //     if(request.id === id){
  //       request.resolutionState = {"isResolved":!request.resolutionState.isResolved, "byAdmin":markedByAdmin}
  //       return request
  //     }
  //   })

  //   await this.collection.set('requests', updated_list_requests).write();

    
   
  //   console.log(updated_list_requests,'222222')

  //   return updated_list_requests;

  //   // return await this.collection.find({ id }).value();
  // }

  
}






