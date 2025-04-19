import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';
import { time } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private JwtService: JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const JwtToken = this.extractTokenFromHeader(request);

    if(!JwtToken) 
      {
        console.log('No JWT Token found')
        throw new HttpException("You are unauthorised to access this page", HttpStatus.UNAUTHORIZED)
      }
      try{
        const payload =  await this.JwtService.verifyAsync(JwtToken, {secret: jwtConstants.secret}) //jwt after verification releases the stored information if the jwt is verified.
        request['user'] = payload; //in the request object we store the payload info under 'user', if the information is needed anywhere in the app later.
      }
      catch(err){
        console.log('something went wrong with jwt.', err)
        throw new HttpException("You are unauthorised to access this page", HttpStatus.UNAUTHORIZED)
      }
      return true
    
  }

  extractTokenFromHeader(request: Request):string|undefined{
    const [type, token] = request.headers.authorization?.split(" ")?? []
    return type=='Bearer' ? token : undefined

  }
}
