import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';

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
import { AddIdToVisitedPlacesDto } from './dto/addIdToVisitedPlaces.dto';
import { UserService } from './user.service';
import { DeletePlaceFromTravelItemDtoResult } from './dto/deletePlaceFromTravelItem.dto';

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

  @Put('/addIdToVisitedPlaces/:id')
  async addIdToVisitedPlaces(
    @Param('id') id: string,
    @Body() addIdToVisitedPlaces: AddIdToVisitedPlacesDto,
  ): Promise<AddIdToVisitedPlacesDto> {
    return this.userService.addIdToVisitedPlaces(id, addIdToVisitedPlaces);
  }

  @Delete('/deletePlaceFromTravelItem/:id/:travelId/:placeId')
  async deletePlaceFromTravelItem(
    @Param('id') id: string,
    @Param('travelId') travelId: string,
    @Param('placeId') placeId: string,
  ): Promise<DeletePlaceFromTravelItemDtoResult> {
    return this.userService.deletePlaceFromTravelItem(id, travelId, placeId);
  }
}
