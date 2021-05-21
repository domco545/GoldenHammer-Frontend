import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/auth.service';
import {Login, Logout, UpdateUser} from './auth.actions';
import {take, tap} from 'rxjs/operators';
import {UpdateAuctions} from '../auction/state/auction.actions';
import {AuctionStateModel} from '../auction/state/auction.state';
import {Observable} from 'rxjs';

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
    return !!state.user;
  }

  @Action(Login)
  // tslint:disable-next-line:typedef
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload.email, action.payload.password)
      .pipe(
        tap(res => {
          ctx.patchState({user: res});
        }));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void{
    const state = ctx.getState();
    ctx.setState({
      user: undefined
    });
  }
}
