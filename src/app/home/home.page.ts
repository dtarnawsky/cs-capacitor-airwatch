import { Component } from '@angular/core';
import { AirwatchService } from '../airwatch.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public vm = { status: '' };

  constructor(private airWatch: AirwatchService) {
    this.vm.status = airWatch.status;
  }

}
