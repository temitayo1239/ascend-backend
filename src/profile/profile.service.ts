import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
  profile: true,
},
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.profile) {
      throw new BadRequestException('Profile already exists');
    }

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    return this.profileRepository.save(profile);
  }

  async findMyProfile(userId: string) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
  user: true,
},
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findMyProfile(userId);

    Object.assign(profile, updateProfileDto);

    return this.profileRepository.save(profile);
  }

  async remove(userId: string) {
    const profile = await this.findMyProfile(userId);

    await this.profileRepository.remove(profile);

    return {
      message: 'Profile deleted successfully',
    };
  }
}