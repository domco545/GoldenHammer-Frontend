import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfigService} from './config.service';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from './index/index.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {AuthState} from './state/auth.state';
import { NavbarComponent } from './includes/navbar/navbar.component';

const config: SocketIoConfig = { url: environment.SOCKET_URL, options: {withCredentials: false} };


@NgModule({
  declarations: [AppComponent, IndexComponent, PageNotFoundComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgxsStoragePluginModule.forRoot({
      key: AuthState
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
