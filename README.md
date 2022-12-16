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

## Setup with Capacitor
### Fixing AppDelegate
You will need to modify the default `AppDelegate.swift` file to support Airwatch:

Add the following line:
`import AWSDK`

Then replace this method making sure to replace `[bundleid]` with your bundle identifier:
```
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        let sourceApplication: String = "[bundle-id]";
        return AWController.clientInstance().handleOpenURL(url, fromApplication: sourceApplication)
        //return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }
```

### Setting Application Query Schemes
On iOS you need to configure the `info.plist` file otherwise you get the error:
```
Cannot process request as `airwatch` application scheme not allowed
    Ensure that Application's Info.plist contains following information
    ...
    <key>LSApplicationQueriesSchemes</key>
    <array>
    <string>airwatch</string>
    <string></string>
    <string>awws1enroll</string>
    </array>
    ...
    
    and Tap "Open" when prompted
    Developer guide to integrate your application with Workspace ONE SDK can be found at

      https://code.vmware.com/docs/10054/VMware-Workspace-ONE-SDK-for-iOS-(Swift)/GUID-AWT-RECEIVECALLBACKFROMAGENT.html
```

The instructions in vmware samples seem incorrect ([here](https://github.com/vmware-samples/workspace-ONE-SDK-integration-samples/blob/main/IntegrationGuideForCordova/GettingStarted.md)) as they are missing `AWSSOBroker2`, also in the plugins `plugin.xml` it has the entry `workspace` which is also not in the instructions.

So when step 8 mentions `Configure trust for all Workspace ONE UEM anchor application schemes` what they mean is make sure all of these are added:
``` xml
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>airwatch</string>
		<string>AWSSOBroker2</string>
		<string>awws1enroll</string>
		<string>wsonesdk</string>
		<string>workspace</string>
	</array>
```

The instructions also say to add a "desired callback scheme" but the `plugin.xml` specifies `$PACKAGE_NAME.awsdkcallback` with a specific `CFBundleURLName` of `com.airwatch.sdk`.

### Additional Instructions
Follow the guide at:
https://github.com/vmware-samples/workspace-ONE-SDK-integration-samples/blob/main/IntegrationGuideForCordova/GettingStarted.md

## Quirks
### Adding Devices
- You need to go to WorkSpace One rather than Workspace One UEM to add a device via QR Code

### Init Callback Errors
- If you haven't installed hub and registered its profile on your device then your app will never call `setSDKEventListener` so you wont be able to track any errors.

### Enroll Errors
The following error may occur (in XCode logs) after getting a device setup with `Hub`:
```
[E] Workspace ONE SDK Can not continue after requesting enrollment details from Anchor Application.

Please check the following things to ensure that the setup does not encounter any problems.
1. Ensure that the open URL is implemented
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        let sourceApplication: String? = {
            if #available(iOS 13.0, *) {
                return url.get(param: "bundleIdentifier")
            } else if let source = options[.sourceApplication] as? String {
                return source
            }
            return nil
        }()
        return AWController.clientInstance().handleOpenURL(url, fromApplication: sourceApplication)
    }
2. If you have swizzled the method somewhere else in your code, ensure that AWController is given a chance to handle it.
3. If you have launched the application while Anchor application is still processing this application's request to share enrollment details.

Developer guide to integrate SDK can be found at

https://code.vmware.com/docs/10054/VMware-Workspace-ONE-SDK-for-iOS-(Swift)/GUID-AWT-RECEIVECALLBACKFROMAGENT.html
```

### Links in Errors Fail
Note: This link is a 403 - no information on the doc site.
`https://code.vmware.com/docs/10054/VMware-Workspace-ONE-SDK-for-iOS-(Swift)/GUID-AWT-RECEIVECALLBACKFROMAGENT.html`

### AirWatch Init always happens
Your app will launch `hub` even if you do not call 

### Emulators Dont Work
As you dont seem to be able to install Hub on an iOS simulator you won't be able to test. A real device is needed.


### Error on get User
The error `The credentials can not be updated until the data store is unlocked` seems to occur on startup if you make a call to get a user (`user`). The user call will fail without an error. This may be caused by the device being associated with the wrong organization.

### SDKEventCallback failure
You may get the follow error which is not really a failure of the SDK:
```
airwatch.sdkEventCallback recievedProfiles {}
App[11312:2681944] In AWSDKBridge -initialCheckDoneWithError: Initial check failed with error: The operation couldn’t be completed. (AWSDKSetupErrorDomains error 7.)
```
## Enrollment Failure
You may get the error:
`Because your device is running Android 10 (or a newer version), Android Enterprise is require for enrollment. Please check with your IT admin about enabling Android Enterprise.`

If this happens you'll need to hardware reset your Android device and set it up a Google account not associated with a MDM or alternatively view this [informative video](https://www.youtube.com/watch?v=hFZFjoX2cGg).
