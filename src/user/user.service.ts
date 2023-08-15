import { Param, Body, NotFoundException, Injectable } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { v4 } from 'uuid';
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

    const { password, ...result } = user.toJSON();

    return result;
  }

  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    const { password, ...result } = user.toJSON();

    return result;
  }

  async createTravel(
    @Param('id') id: string,
    @Body() createTravelDto: CreateTravelDto,
  ): Promise<CreateTravelDtoResult> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const travelId = v4() as string;

    const userAfterUpdating = await this.userModel.findByIdAndUpdate(
      id,
      {
        currentTravelId: travelId,
        travelList: {
          ...user.travelList,
          [travelId]: {
            ...createTravelDto,
            id: travelId,
            dislikeList: [],
            likeList: [],
          },
        },
      },
      { new: true },
    );

    return {
      currentTravelId: userAfterUpdating.currentTravelId,
      travelItem:
        userAfterUpdating.travelList[userAfterUpdating.currentTravelId],
    };
  }

  async getTravelItem(
    @Param('id') id: string,
    @Body() { travelId }: { travelId: string },
  ): Promise<CreateTravelDtoResult> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { travelList } = user.toJSON();

    if (!travelList[travelId]) {
      throw new NotFoundException('Travel Item not found');
    }

    this.userModel.findByIdAndUpdate(
      user._id,
      {
        currentTravelId: travelId as string,
      },
      { new: true },
    );

    return {
      currentTravelId: travelId,
      travelItem: travelList[travelId],
    };
  }

  async updateTravelItem(
    @Param('id') id: string,
    @Body() updateTravelItem: UpdateTravelItemDto,
  ): Promise<UpdateTravelItemDtoResult> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { travelList } = user.toJSON();

    if (!travelList[updateTravelItem.id]) {
      throw new NotFoundException('Travel Item not found');
    }

    this.userModel.findByIdAndUpdate(
      user._id,
      {
        travelList: {
          ...user.travelList,
          [updateTravelItem.id]: {
            ...travelList[updateTravelItem.id],
            ...updateTravelItem,
          },
        },
      },
      { new: true },
    );

    return {
      currentTravelId: updateTravelItem.id,
      travelItem: travelList[updateTravelItem.id],
    };
  }

  async estimatePlace(
    @Param('id') id: string,
    @Body() estimatePlaceDto: EstimatePlaceDto,
  ): Promise<EstimatePlaceDtoResult> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { travelList } = user.toJSON();

    if (!travelList[estimatePlaceDto.currentTravelId]) {
      throw new NotFoundException('Travel Item not found');
    }

    let newValues = {
      dislikeList: [],
      likeList: [],
    } as EstimatePlaceDtoResult;

    const likeList =
      travelList[estimatePlaceDto.currentTravelId].likeList || [];
    const dislikeList =
      travelList[estimatePlaceDto.currentTravelId].dislikeList || [];

    if (estimatePlaceDto.event === 'like') {
      const likeList =
        travelList[estimatePlaceDto.currentTravelId].likeList || [];
      const isAlreadyAdded = likeList.find((item) => {
        return item.fsq_id === estimatePlaceDto.placeItem.fsq_id;
      });

      if (!isAlreadyAdded) {
        newValues = {
          likeList: [...likeList, estimatePlaceDto.placeItem],
          dislikeList,
        };
      }
    } else {
      const isAlreadyAdded = dislikeList.find((item) => {
        return item.fsq_id === estimatePlaceDto.placeItem.fsq_id;
      });

      if (!isAlreadyAdded) {
        newValues = {
          dislikeList: [...dislikeList, estimatePlaceDto.placeItem],
          likeList,
        };
      }
    }

    this.userModel.findByIdAndUpdate(
      user._id,
      {
        travelList: {
          ...user.travelList,
          [estimatePlaceDto.currentTravelId]: {
            ...travelList[estimatePlaceDto.currentTravelId],
            ...newValues,
          },
        },
      },
      { new: true },
    );

    return newValues;
  }
}
