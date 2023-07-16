import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';

export type RequestResult = Promise<{ token: string; id: string }>;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ name, email, password }: SignUpDto): RequestResult {
    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token, id: user._id.toString() };
  }

  async login({ email, password }: LoginDto): RequestResult {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is invalid');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, id: user._id.toString() };
  }

  async updatePassword({
    password,
    newPassword,
    id,
  }: UpdatePasswordDto): RequestResult {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is invalid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 6);

    this.userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true },
    );

    const token = this.jwtService.sign({ id: user._id });

    return { token, id: user._id.toString() };
  }

  async updateEmail({ id, newEmail }: UpdateEmailDto): RequestResult {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    this.userModel.findByIdAndUpdate(
      user._id,
      { email: newEmail },
      { new: true },
    );

    const token = this.jwtService.sign({ id: user._id });

    return { token, id: user._id.toString() };
  }
}
