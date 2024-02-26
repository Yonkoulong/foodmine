import { MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(6)
    password = '';
    username = '';

    role = 'user'
    fullname = '';
    email = '';
    phoneNumber = '';
    address = '';
    imageUser = '';
}
