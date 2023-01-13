import { Component } from '@angular/core';
import { AirwatchService } from '../airwatch.service';
import { Preferences } from '@capacitor/preferences';

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
    this.initAppConfig();
  }

  public async initialize() {
    this.airWatch.init();
  }

  public async getUser() {
    alert(await this.airWatch.getUser());
  }

  public async getConfig() {
    const result = await Preferences.get({ key: 'ionic.email' });
    alert(result.value);
  }
  public async get(keyName: string) {
    const result = await Preferences.get({ key: keyName });
    alert(result.value);
  }

  private async initAppConfig() {
    await Preferences.configure({ group: 'NativeStorage' });
    this.keys = (await Preferences.keys()).keys;
  }
}
