import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly surName: string;

  @IsOptional()
  readonly sex: string;

  @IsOptional()
  readonly birthDate: string;

  @IsOptional()
  @IsArray()
  readonly likes: string[] = [];

  @IsOptional()
  @IsArray()
  readonly dislikes: string[] = [];

  @IsOptional()
  readonly location: string;

  @IsOptional()
  readonly avatar: string;
}
