import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, } from "class-validator";
import { resolutionStateOfMaintaineneceRequest } from "src/schemas/maintenanceRequest.schema";

export class createMaintenanceRequestDto{
        // Name of the requester
        @IsNotEmpty()
        @IsString()
        name: string;
        // Email of the requester

        @IsNotEmpty()
        @IsString()
        email: string;

        // The unit # in the building
        @IsNotEmpty()
        @IsNumber()
        unitNumber: Number;

        // The type of service being requested
        @IsNotEmpty()
        serviceType: ServiceType;

        // A summary of of the issue
        @IsNotEmpty()
        @IsString()
        summary: string;

        // Any extra details
        @IsOptional()
        @IsString()
        details?: string;

        // date of submission of request - system generated.
        @IsOptional()
        @IsDate()
        submittedAt?: Date;

         //system generated when clicked on resolved by any Admin. isResolved means if the problem is resolved and if yes by whom. {"isResolved":False,"byAdmin":{}}  {"isResolved":True,"byAdmin":{admin details object telling who marked true and his details}}
        @IsOptional()
        // @IsObject()
        resolutionState?: resolutionStateOfMaintaineneceRequest;
       
}


export enum ServiceType {
    Electrical = 'electrical',
    General = 'general',
    PestControl = 'pest-control',
    Plumbing = 'plumbing',
  }
