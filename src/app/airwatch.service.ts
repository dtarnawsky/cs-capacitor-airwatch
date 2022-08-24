import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AirwatchService {

  public status: string;
  constructor(private platform: Platform) {
    this.status = 'Unknown';
  }

  public init() {
    if (!(window as any).plugins) {
      console.error('Plugins are not installed', this.platform.platforms());
      this.status = 'Plugins are Unavailable';
      return;
    }

    if (!(window as any).plugins.airwatch) {
      alert('Airwatch is not supported');
      this.status = 'Airwatch Plugin Unavailable';
      return;
    }
    (window as any).plugins.airwatch.setSDKEventListener(this.sdkEventCallback);
    this.status = 'Airwatch Plugin Initialization Started';
  }

  sdkEventCallback(event, info) {
    if (event === 'initSuccess') {
      console.log('Success');
      this.status = 'Airwatch Plugin Initialized';
    } else {
      this.status = 'Airwatch Plugin Failed';
      console.log('airwatch.sdkEventCallback', event, info);
    }
  }
}
