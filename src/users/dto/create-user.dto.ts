import { Role } from '../enums/role.enum';

export class CreateUserDto {
  fullName: string;

  email: string;

  username: string;

  password: string;

  emailVerified?: boolean;

  role?: Role;
}