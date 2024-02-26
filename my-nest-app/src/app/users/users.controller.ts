import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserData } from './type/user.type';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  signIn(@Body() body: SigninUserDto) {
    return this.usersService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.signUpUser(createUserDto);
  }

  @Post('find-all')
  findAll(@Body() data: UserData) {
    return this.usersService.findAllUsers(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
