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
    //(window as any).plugins.airwatch.setSDKEventListener(this.sdkEventCallback);
    (window as any).plugins.airwatch.setSDKEventListener((event, info) => {
      console.log('airwatch.sdkEventCallback', event, info);
      if (event === 'initSuccess') {
        console.log('Success');
        this.status = 'Airwatch Plugin Initialized';
        return;
      }
      if (event === 'initFailure') {
        this.status = 'Airwatch Plugin Failed';
        return;
      }
    });
    this.status = 'Airwatch Plugin Initialization Started...';
  }


  public async getUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      (window as any).plugins.airwatch.username((username: string) => {
        resolve(username);
      }, (error) => {
        console.error('failed call to user', error);
        reject(error);
      });
    });
  }
}
