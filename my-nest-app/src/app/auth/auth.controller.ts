import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController { 
    constructor(private authService: AuthService) {}
    
    @Post('signin')
    signIn(@Body() body: SigninUserDto) {
        return this.authService.signIn(body);
    }
}