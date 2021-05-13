import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/auth.service';
import {Login, Logout} from './auth.actions';
import {tap} from 'rxjs/operators';

export interface AuthStateModel {
  user: User | undefined;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: undefined,
  }
})

@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {
  }

  @Selector()
  static user(state: AuthStateModel): User | undefined {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.user?.id;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login): void{
    this.authService.login(action.payload.email, action.payload.password)
      .subscribe(data => {
        ctx.patchState({
          user: data
        });
      });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void{
    const state = ctx.getState();
    ctx.setState({
      user: undefined
    });
  }
}
