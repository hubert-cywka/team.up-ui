import { UserRole } from 'shared/enums/UserRole.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}
