import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Gender } from '../enums/gender.enum';
import { ActivityLevel } from '../enums/activity-level.enum';
import { TrainingLocation } from '../enums/training-location.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';

export class CreateProfileDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  dateOfBirth: Date;

  @IsNumber()
  @Min(100)
  @Max(250)
  height: number;

  @IsNumber()
  @IsPositive()
  @Min(20)
  @Max(300)
  currentWeight: number;

  @IsNumber()
  @IsPositive()
  @Min(20)
  @Max(300)
  targetWeight: number;

  @IsString()
  country: string;

  @IsString()
  region: string;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;

  @IsEnum(TrainingLocation)
  trainingLocation: TrainingLocation;

  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @IsString()
  dreamPhysique: string;
}