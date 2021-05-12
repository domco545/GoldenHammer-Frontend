import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ConfigModel } from './config.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configSubject$ = new ReplaySubject<ConfigModel>(1);
  config$ = this.configSubject$.asObservable();
  configSnapshot: ConfigModel | undefined;

  constructor(public http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get<ConfigModel>('./assets/config.json').pipe(
      map((config) => {
        this.configSnapshot = config;
        this.configSubject$.next(config);
      })
    );
  }
}



