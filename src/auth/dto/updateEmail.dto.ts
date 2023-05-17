import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly newEmail: string;
}
