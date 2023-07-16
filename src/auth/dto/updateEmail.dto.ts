import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly newEmail: string;
}
