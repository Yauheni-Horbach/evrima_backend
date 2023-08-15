import { Controller, Get, Param, Body, Put, Query } from '@nestjs/common';

import { UserDto } from '../common/dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  CreateTravelDto,
  CreateTravelDtoResult,
} from './dto/createTravelItem.dto';
import {
  UpdateTravelItemDto,
  UpdateTravelItemDtoResult,
} from './dto/updateTravelItem.dto';
import {
  EstimatePlaceDto,
  EstimatePlaceDtoResult,
} from './dto/estimatePlace.dto';
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

  @Put('/createTravel/:id')
  async createTravel(
    @Param('id') id: string,
    @Body() createTravelDto: CreateTravelDto,
  ): Promise<CreateTravelDtoResult> {
    return this.userService.createTravel(id, createTravelDto);
  }

  @Get('/getTravelItem/:id')
  async getTravelItem(
    @Param('id') id: string,
    @Query() params: { travelId: string },
  ): Promise<CreateTravelDtoResult> {
    return this.userService.getTravelItem(id, params);
  }

  @Put('/updateTravelItem/:id')
  async updateTravelItem(
    @Param('id') id: string,
    @Body() updateTravelItemDto: UpdateTravelItemDto,
  ): Promise<UpdateTravelItemDtoResult> {
    return this.userService.updateTravelItem(id, updateTravelItemDto);
  }

  @Put('/estimatePlace/:id')
  async likeItem(
    @Param('id') id: string,
    @Body() estimatePlaceDto: EstimatePlaceDto,
  ): Promise<EstimatePlaceDtoResult> {
    return this.userService.estimatePlace(id, estimatePlaceDto);
  }
}
