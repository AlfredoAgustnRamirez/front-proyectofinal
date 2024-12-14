import { Roles, RolesId  } from './shared/endpoints.constant';

export interface IUser {
  username: string;
  password: string;
  role?: Roles | undefined;
  roleId?: RolesId | undefined;
}
