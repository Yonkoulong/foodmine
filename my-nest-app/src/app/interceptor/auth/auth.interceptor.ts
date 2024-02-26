import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { errorResponse } from '../../utility/response.utility';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();    
    const token = request.headers.authorization.split(' ')[1];
    if(!token) {throw new UnauthorizedException(errorResponse('Unauthorized', 401));}
    
    const user = this.usersService.getUserFromToken(token);
    console.log(user);
    
    if(user) {request.userInfo = user;}
    
    return next.handle();
  }
}