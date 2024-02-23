import { MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(6)
    password = '';

    username = '';
    role = 'customer'
}
