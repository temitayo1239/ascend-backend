import { Injectable } from '@nestjs/common';

import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  async complete(
    userId: string,
    completeOnboardingDto: CompleteOnboardingDto,
  ) {
    const profile = await this.profileService.create(
      userId,
      completeOnboardingDto,
    );

    return {
      success: true,
      message: 'Onboarding completed successfully',
      nextStep: '/dashboard',
      profile,
    };
  }
}
