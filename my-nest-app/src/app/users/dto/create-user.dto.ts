import { MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(6)
    password = '';
    
    @MinLength(6)
    username = '';

    role = ''
    fullname = '';
    email = '';
    phoneNumber = '';
    address = '';
    imageUser = '';
}
