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
  Req,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserData } from './type/user.type';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthInterceptor } from '../interceptor/auth/auth.interceptor';
import { AuthGuard } from '../guard/auth.guard';

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
  @UseGuards(AuthGuard)
  findAll(@Body() data: UserData) {
    return this.usersService.findAllUsers(data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
