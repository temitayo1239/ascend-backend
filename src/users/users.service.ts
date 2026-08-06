import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
  const user = this.userRepository.create(createUserDto);

  return await this.userRepository.save(user);
}

async findById(id: string) {
  return await this.userRepository.findOne({
    where: { id },
  });
}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmailOrUsername(identifier: string) {
  return await this.userRepository.findOne({
    where: [
      {
        email: identifier,
      },
      {
        username: identifier,
      },
    ],
  });
}

  async checkDuplicate(email: string, username: string) {
    const existingEmail = await this.findByEmail(email);

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.findByUsername(username);

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }
  }
}