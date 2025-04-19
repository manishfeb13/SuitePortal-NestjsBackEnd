import { Injectable } from '@nestjs/common';
import { MaintenanceRequestDao} from './maintenance-request.dao';
import { createMaintenanceRequestDto } from './dto/maintenanceRequest.dto';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao) {}

  async createMaintenanceRequest(maintenanceRequest: createMaintenanceRequestDto) {
    maintenanceRequest.submittedAt = new Date;
    maintenanceRequest.resolutionState = {isResolved:false, byAdmin: {name: undefined}} //isResolved is false as its just created and not resolved until marked by an admin and that's why whyAdmin : {}
    console.log(maintenanceRequest)
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getAllMaintenanceRequest(): Promise<createMaintenanceRequestDto[]> {
    let data =  await this.maintReqDao.getAllMaintenanceRequest();
    return data
  }

  async closeMaintenanceRequest(id: string, markedByAdmin): Promise<createMaintenanceRequestDto> {
    const resolutionState = {isResolved: !(await this.maintReqDao.getMaintenanceRequest(id)).resolutionState.isResolved, byAdmin: markedByAdmin}
    return await this.maintReqDao.closeMaintenanceRequest(id, resolutionState);
  }

//   async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
//     return await this.maintReqDao.getMaintenanceRequest(id);
//   }
}

