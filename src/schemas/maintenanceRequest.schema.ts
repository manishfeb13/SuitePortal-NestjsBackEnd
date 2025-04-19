import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AdminDto } from "src/admin/dto/admin.dto";
import { ServiceType } from "src/maintenance-request/dto/maintenanceRequest.dto";



export class resolutionStateOfMaintaineneceRequest {
    isResolved: boolean;
    byAdmin: AdminDto | {};
}

@Schema({minimize:false})
export class MaintenanceRequest {

    // Name of the requester
    @Prop({required:true})
    name: string;

    // Email of the requester
    @Prop({required:true})
    email: string;

    // The unit # in the building
    @Prop({required:true})
    unitNumber: Number;

    // The type of service being requested
    @Prop({required:true})
    serviceType: ServiceType;

    // A summary of of the issue
    @Prop({required:true})
    summary: string;

    // Any extra details
    @Prop({required:false})
    details?: string;

    // date of submission of request - system generated.
    @Prop({required:true})
    submittedAt: Date;

    //system generated when clicked on resolved by any Admin. isResolved means if the problem is resolved and if yes by whom. {"isResolved":False,"byAdmin":{}}  {"isResolved":True,"byAdmin":{admin details object telling who marked true and his details}}
    @Prop({required:true})
    resolutionState?: resolutionStateOfMaintaineneceRequest;
   
}

export const MaintenanceRequestSchema = SchemaFactory.createForClass(MaintenanceRequest)