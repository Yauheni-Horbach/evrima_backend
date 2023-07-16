import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters' })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters' })
  readonly newPassword: string;

  readonly id: string;
}
