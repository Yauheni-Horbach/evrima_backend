import { IsString, IsNotEmpty, IsArray, IsEmail } from 'class-validator';
import { TravelItem } from '../../types';

export class UserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  surName = '';

  @IsString()
  sex = '';

  @IsNotEmpty()
  birthDate = '';

  @IsArray()
  likes: string[] = [];

  @IsArray()
  dislikes: string[] = [];

  @IsString()
  location: string;

  @IsString()
  avatar: string;

  @IsString()
  currentTravelId: string;

  @IsString()
  travelList: {
    [key: string]: TravelItem;
  };
}
