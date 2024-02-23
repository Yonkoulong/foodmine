import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserData } from './type/user.type';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async signUpUser(createUserDto: CreateUserDto) {
    const existingUser = await this.model.findOne({ username: createUserDto.username }).exec();
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.model({ ...createUserDto, password });
    return await newUser.save();
  }

  async findAllUsers(data: UserData): Promise<{ users: Omit<User, 'password'>[], total: number }> {
    const { user, records } = data;
    
    const skip = (records.page - 1) * records.limit;
    const users = await this.model.find().skip(skip).limit(records.limit).exec();
    const total = await this.model.countDocuments().exec();
    const formattedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });
    return { users: formattedUsers, total };
  }

  async findUserById(id: string): Promise<User>{
    const user = await this.model.findById(id).exec();

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.model.findOne({username}).exec();

    if(!user) {
      throw new Error('User not found');
    } 
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.model.findByIdAndUpdate(id).exec();

    if(!user) {
      throw new Error('User not found');
    } 

    return user;
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.model.findByIdAndDelete(id).exec();

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
