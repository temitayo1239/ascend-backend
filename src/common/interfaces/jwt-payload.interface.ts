import { Role } from '../../users/enums/role.enum';

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role: Role;
}