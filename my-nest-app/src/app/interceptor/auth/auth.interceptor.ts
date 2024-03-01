import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();        
    const token = request.headers.authorization.split(' ')[1];

    try {
      const user = this.jwtService.verify(token, { secret: "secret" });
      request.userInfo = user.userInfo;
      
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    
    return next.handle();
  }
}