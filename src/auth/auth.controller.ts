import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, RequestResult, UserRequestResult } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): UserRequestResult {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(
    @Body()
    loginDto: LoginDto,
  ): UserRequestResult {
    return this.authService.login(loginDto);
  }

  @Post('/update-password')
  async updatePassword(
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ): RequestResult {
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Post('/update-email')
  async updateEmail(
    @Body()
    updateEmailDto: UpdateEmailDto,
  ): RequestResult {
    return this.authService.updateEmail(updateEmailDto);
  }
}
