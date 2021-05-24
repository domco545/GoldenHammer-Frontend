import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        NgbAlertModule
    ]
})
export class UserModule { }
