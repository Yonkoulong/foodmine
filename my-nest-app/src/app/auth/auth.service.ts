import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) {}

    async signIn(body: SigninUserDto) {
        const { username, password } = body;
        const user = await this.userService.findOneUser(username);

        if (bcrypt.compareSync(password, user.password)) {
            const token = this.jwtService.sign({ username: user.username });
            return { token };
        }

        // Throw an error if authentication fails
        throw new Error('Invalid username or password.');
    }
}