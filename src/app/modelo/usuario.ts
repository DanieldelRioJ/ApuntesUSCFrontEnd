import { Role } from './role';

export class Usuario {
  id:number;
  username:string;
  password: string;
  role:Role;
  enabled:boolean;
}
