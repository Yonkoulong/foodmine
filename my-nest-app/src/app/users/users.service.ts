import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserData } from './type/user.type';
import { errorResponse, successResponse } from '../utility/response.utility';
import { ErrorInterface } from '../shared/interfaces/error.interface';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    // this.model.collection.dropIndexes(); // Drop all indexes
  }

  async signIn(body: SigninUserDto) {
    const { username, password } = body;
    const user = await this.model.findOne({ username }).exec();

    if (!user) {
      return errorResponse('', 401);
    }

    try {
      if (bcrypt.compareSync(password, user.password)) {
        const { password,  ...userWithoutPassword } = user.toObject();
        userWithoutPassword._id =  userWithoutPassword._id.toString();
      
        const token = this.jwtService.sign({ userInfo: userWithoutPassword });
        return successResponse('User logged in successfully', { token, userInfo: userWithoutPassword });
      } else {
        return errorResponse('Password is not correct', 401);
      }
    } catch (error) {
      console.log(error);
      
      return errorResponse('Error logging in', 500);
    }
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const newUser: CreateUserDto = {
      username: createUserDto.username,
      password: createUserDto.password,
      fullname: '',
      email: '',
      role: 'user',
      phoneNumber: '',
      address: '',
      imageUser: '',
    };
    try {
      const password = await bcrypt.hash(newUser.password, 10);
      await new this.model({
        ...newUser,
        password,
      }).save();
      return successResponse('User created successfully', {});
    } catch (error: ErrorInterface | unknown) {
      console.log(error);

      if ((error as ErrorInterface).code === 11000) {
        return errorResponse('User already exists', HttpStatus.CONFLICT);
      }
      return errorResponse(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllUsers(data: UserData) {
    const { user, records } = data;

    try {
      const skip = (records.page - 1) * records.limit;
      const users = await this.model
        .find({ ...user })
        .skip(skip)
        .limit(records.limit)
        .exec();
      const total = await this.model.countDocuments().exec();
      const formattedUsers = users.map((user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });
      return successResponse('Users fetched successfully', {
        users: formattedUsers,
        total,
      });
    } catch (error) {
      return errorResponse(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findUserById(id: string): Promise<User | any> {
    try {
      const user = await this.model.findById(id).exec();
      return successResponse('User fetched successfully', user);
    } catch (error) {
      return errorResponse('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOneUser(username: string): Promise<User | any> {
    try {
      const user = await this.model.findOne({ username }).exec();
      return successResponse('User fetched successfully', user);
    } catch (error) {
      return errorResponse('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User | any> {
    try {
      delete updateUserDto.username;
      delete updateUserDto.password;
      delete updateUserDto.role;

      const user = await this.model.findByIdAndUpdate(id, updateUserDto).exec();
      if (!user) {
        return errorResponse('User not found', HttpStatus.NOT_FOUND);
      }

      return successResponse('User updated successfully', user);
    } catch (error) {
      return errorResponse('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeUser(id: string): Promise<User | any> {
    try {
      const user = await this.model.findByIdAndDelete(id).exec();
      return successResponse('User deleted successfully', user);
    } catch (error) {
      return errorResponse('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async changePassword(id: string, password: string): Promise<User | any> {
    try {
      const user = await this.model.findById(id).exec();

      if (!user) {
        return errorResponse('User not found', HttpStatus.NOT_FOUND);
      }

      const newPassword = await bcrypt.hash(password, 10);
      user.password = newPassword;
      await user.save();
      return successResponse('Password changed successfully', {});
    } catch (error) {
      return errorResponse('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
