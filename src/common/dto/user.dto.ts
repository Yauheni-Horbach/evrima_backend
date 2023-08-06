import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  currentTravelId: string;
}
