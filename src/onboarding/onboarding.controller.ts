import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { OnboardingService } from './onboarding.service';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
  ) {}

  @Post('complete')
  @ApiOperation({
    summary: 'Complete user onboarding',
  })
  complete(
    @Req() req,
    @Body() completeOnboardingDto: CompleteOnboardingDto,
  ) {
    return this.onboardingService.complete(
      req.user.id,
      completeOnboardingDto,
    );
  }
}