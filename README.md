# Capacitor Airwatch

Sample application using Capacitor 4 and the [Cordova plugin](https://www.npmjs.com/package/airwatch-sdk-plugin) for VMWare Workspace One SDK (Airwatch).

## Installation

Run the following:
- `npm install`
- `npx cap run android` (Android Studio should be installed)
- or `npx cap run ios` (XCode should be installed)

Additional information on enviroment setup can be found here:
[https://capacitorjs.com/docs/getting-started/environment-setup](https://capacitorjs.com/docs/getting-started/environment-setup)

## Debugging
The web project can be built and copied with:
`npm run build && npx cap copy`

You can then use XCode to open and run/debug the native project in `ios/App/App.xcworkspace` or in Android Studio in `/android`