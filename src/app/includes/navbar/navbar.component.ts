import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';
import {Logout} from '../../state/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(AuthState.isAuthenticated) loggedIn$: Observable<boolean> | undefined;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.store.dispatch(new Logout());
  }
}
