import { Component } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GoldenHammer-Frontend';

  config$ = this.configService.config$;

  constructor(private configService: ConfigService) {
    configService.loadConfig().subscribe();
  }
}
