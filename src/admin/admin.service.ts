import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AdminDao } from './admin.dao';
import { AuthService } from 'src/auth/auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessRefreshTokensDto } from './dto/acess-refresh-tokens.dto';


@Injectable()
export class AdminService {

  constructor(private adminDao: AdminDao, private authService: AuthService) {
    //
  }

  async register(newAdminRegister: AdminDto) {
    const hashedPassword = await this.authService.convertToHash(newAdminRegister.password);
    const newAdminWithdPassHashed = {...newAdminRegister}; //as we don't want to modify the actual AdminDto object. //true cloning of dto object to new variable.
    newAdminWithdPassHashed.password = hashedPassword; //changing the plainText password string to hashed string.
    console.log(newAdminWithdPassHashed)
    const createdUser = await this.adminDao.registerAdmin(newAdminWithdPassHashed);
    return createdUser;
  }

  async login(userLoginDetail:LoginDto): Promise<AccessRefreshTokensDto>{
    const user = await this.adminDao.findUserByEmail(userLoginDetail.email)
    if(!user){
      throw new HttpException("User Doesn't Exist. Please Register.", HttpStatus.UNAUTHORIZED)
    }
    const isPasswordMatched =  await this.authService.comparePasswordToHash(userLoginDetail.password, user.password) // (rawPassword, hashedPasswordOfExistingUserInDb)
    if(!isPasswordMatched){
      throw new HttpException("Wrong Credentials", HttpStatus.UNAUTHORIZED)
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      jobRole: user.jobRole,
      phoneNo: user.phoneNo,
      age: user.age,
      address: user.address
    }

    return await this.authService.generateJwtToken(payload)
    

    // const { password, ...result} = user.toObject() //as user is not an actual object its a document (which is returned by db).
    // console.log(user)
    // return result
  }


  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<AccessRefreshTokensDto>{
     const StordRefreshToken = await this.authService.VerifyRefreshTokens(refreshTokenDto)
     if(!StordRefreshToken){
      throw new HttpException('Token Expired! Login again', HttpStatus.UNAUTHORIZED)
     }
     const user = await this.adminDao.findUserById(StordRefreshToken.user_id)

     if(!user){
      throw new HttpException("something Went wrong. Please login again.", HttpStatus.BAD_REQUEST)
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      jobRole: user.jobRole,
      phoneNo: user.phoneNo,
      age: user.age,
      address: user.address
    }

    return {
      ... await this.authService.generateJwtToken(payload)
    }
     
  }

  


//   async login(userLoginDetail: LoginDto) {
//     const { email, password } = userLoginDetail;
//     console.log(email, password,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
//     const user = await this.lowdbDao.find({ email }, 'auths');
//     if (!user) {
//       throw new HttpException(
//         `You are not registered with us.`,
//         HttpStatus.UNAUTHORIZED,
//       );
//     } else if(password != user.password){

//       throw new HttpException(
//         `Wrong Password. Please try again`,
//         HttpStatus.UNAUTHORIZED,
//       );
      
//     }

//     return user;
//   }


}