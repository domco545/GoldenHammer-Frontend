import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): boolean{
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }
}
