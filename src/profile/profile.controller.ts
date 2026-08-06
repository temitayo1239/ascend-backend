import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create profile' })
  create(
  @CurrentUser() user: JwtPayload,
  @Body() createProfileDto: CreateProfileDto,
) {
  return this.profileService.create(
    user.id,
    createProfileDto,
  );
}

  @Get('me')
  @ApiOperation({ summary: 'Get my profile' })
  findMyProfile(
  @CurrentUser() user: JwtPayload,
) {
  return this.profileService.findMyProfile(user.id);
}

  @Patch()
  @ApiOperation({ summary: 'Update my profile' })
  update(
  @CurrentUser() user: JwtPayload,
  @Body() updateProfileDto: UpdateProfileDto,
) {
  return this.profileService.update(
    user.id,
    updateProfileDto,
  );
}

  @Delete()
  @ApiOperation({ summary: 'Delete my profile' })
  remove(
  @CurrentUser() user: JwtPayload,
) {
  return this.profileService.remove(user.id);
}
}
