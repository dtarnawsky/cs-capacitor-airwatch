import { Component } from '@angular/core';
import { AirwatchService } from './airwatch.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private air: AirwatchService) {
    this.air.init();
  }
}
