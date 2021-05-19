import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Login} from '../../state/auth.actions';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFc = new FormControl('');
  passwordFc = new FormControl('');

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.emailFc.value && this.passwordFc.value) {
      this.store.dispatch(new Login({email: this.emailFc.value, password: this.passwordFc.value})).subscribe(() => {
        console.log('success');
      }, error => {
        console.log(error);
      });
    }
  }
}
