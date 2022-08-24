import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AirwatchService } from './airwatch.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private airWatch: AirwatchService) {
    this.airWatch.init();
  }


}
