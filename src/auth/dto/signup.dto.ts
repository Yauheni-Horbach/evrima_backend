import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters' })
  readonly password: string;
}
