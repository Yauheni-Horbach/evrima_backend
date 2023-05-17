import { Param, Body, NotFoundException, Injectable } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { UserDto } from '../common/dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUserProfile(
    @Param('id')
    id: string,
  ): Promise<UserDto> {
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new NotFoundException('Id is invalid');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
