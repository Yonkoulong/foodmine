import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {} 

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
   
    try {
      const user = this.jwtService.verify(token, { secret: "secret" });
      
      if(user.userInfo.role === 'admin') {
        return true;
      }
      return false;
    } catch(error) {
      return false;
    }
  }
}


