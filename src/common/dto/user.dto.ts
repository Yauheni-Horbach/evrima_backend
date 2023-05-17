import { IsString, IsNotEmpty, IsArray, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

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
}
