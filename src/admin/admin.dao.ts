import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDetails } from 'src/schemas/adminDetails.schema';
import { AdminDto } from './dto/admin.dto';


@Injectable()
export class AdminDao {

constructor(@InjectModel(AdminDetails.name) private adminDetailsModel : Model<AdminDetails>) {}

async registerAdmin(newAdminRegisterWithPassHashed:AdminDto){
    try{
    const newUser = new this.adminDetailsModel(newAdminRegisterWithPassHashed)
    return await newUser.save()
    }
    catch(er){
        //er.code = 11000 from MongoDb refers to Duplicate Key i.e. user email already in db.
        if(er.code == 11000){
            throw new HttpException({'status': HttpStatus.NOT_ACCEPTABLE,
                'error': 'User Email Already Found in Database'}, HttpStatus.NOT_ACCEPTABLE)
              }
        else {
            //if there is any other error.
            return er
        } 
    }
}

async findUserByEmail(email){               //: Promise<AdminDto|null>
    return await this.adminDetailsModel.findOne({'email': email})
}

async findUserById(user_id){               //: Promise<AdminDto|null>
    return await this.adminDetailsModel.findOne({'_id': user_id})
}

}


  // const isEmailUserExist = await this.findUserByEmail(newAdminRegister.email)
    // if(!isEmailUserExist){
    //     const newAdmin = new this.adminDetailsModel(newAdminRegister);
    //     return await newAdmin.save()
    // }
    // else{
    //     throw new HttpException({
    //         status: HttpStatus.NOT_ACCEPTABLE,
    //         error: 'User Email Already Found in Database'}, 
    //         HttpStatus.NOT_ACCEPTABLE)
    // }


//   async findAll(collctionName: CollctionName): Promise<any> {
//     const listUsers = await this.db.get(collctionName).value();
//     return listUsers;
//   }


  // async update(
  //   key: string,
  //   value: string | String,
  //   collctionName: string,
  //   dataUpdate: any,
  // ): Promise<any> {
  //   const listUsers = await this.db.get(collctionName).value();
  //   let out;
  //   const listData = listUsers.map(user => {
  //     if (user[key] !== value) return user;
  //     if (user[key] === value) {
  //       out = Object.assign(user, dataUpdate);
  //       return out;
  //     }
  //   });
  //   await this.db.set(collctionName, listData).write();
  //   return out;
  // }


