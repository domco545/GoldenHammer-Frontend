import {User} from '../shared/models/user.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string, password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class UpdateUser {
  constructor(public user: User) {}

  static readonly type = '[Auth] Update User';
}
