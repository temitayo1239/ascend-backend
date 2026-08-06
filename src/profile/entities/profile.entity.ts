import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Gender } from '../enums/gender.enum';
import { ActivityLevel } from '../enums/activity-level.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { TrainingLocation } from '../enums/training-location.enum';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'date',
  })
  dateOfBirth: Date;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  height: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  currentWeight: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  targetWeight: number;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
  })
  activityLevel: ActivityLevel;

  @Column({
    type: 'enum',
    enum: TrainingLocation,
  })
  trainingLocation: TrainingLocation;

  @Column({
    type: 'enum',
    enum: ExperienceLevel,
  })
  experienceLevel: ExperienceLevel;

  @Column()
  dreamPhysique: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
