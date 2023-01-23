import { Component } from '@angular/core';
import { AirwatchService } from '../airwatch.service';
import { AppConfig } from '@capacitor-community/mdm-appconfig';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public vm = { status: '' };
  public keys: Array<string> = [];

  constructor(private airWatch: AirwatchService) {
    this.vm.status = airWatch.status;
  }

  public async initialize() {
    this.airWatch.init();
  }

  public async getUser() {
    alert(await this.airWatch.getUser());
  }

  async get(key: string) {
    try {
      const result = await AppConfig.getValue({ key });
      alert(result.value);
    } catch (err: any) {
      alert(err);
    }
  }


}
