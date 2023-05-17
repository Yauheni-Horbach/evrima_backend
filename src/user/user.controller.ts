import { Controller, Get, Param, Body, Put } from '@nestjs/common';

import { UserDto } from '../common/dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserProfile(
    @Param('id')
    id: string,
  ): Promise<UserDto> {
    return this.userService.getUserProfile(id);
  }

  @Put(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUserProfile(id, updateUserDto);
  }
}
