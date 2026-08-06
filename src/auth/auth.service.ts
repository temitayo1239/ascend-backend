import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    await this.usersService.checkDuplicate(
      registerDto.email,
      registerDto.username,
    );

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    const user = await this.usersService.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
    });

    return {
      message: 'Registration successful',
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    };
  }

  async login(loginDto: LoginDto) {
  const user = await this.usersService.findByEmailOrUsername(
    loginDto.identifier,
  );

  if (!user) {
    throw new BadRequestException('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!passwordMatch) {
    throw new BadRequestException('Invalid credentials');
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',

    accessToken,

    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  };
}
}