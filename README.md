## How to pull this code

In order to pull this repository to another system follow the steps below:

### Prerequisites

1. Make sure you have Node.js(version 6 or higher) and git Bash installed.
2. Android SDK installed (API 19 or higher) (optional).
3. An emulator(preferrably Android version 4.4.4) or device to run the app.

## Installation
1. Open Git Bash and enter the following command
```bash
sudo npm install -g ionic cordova
```
2. Run the following command on Git Bash
```bash
git clone https://github.com/johnveeuminga/wallshop.app.git
```
3. Navigate to the wallshop folder on bash using the code below
```bash
cd wallshop.app
```
4. Run npm install on bash
```bash
npm install
```
5.Run ionic state restore on bash
```bash
ionic state restore
```

## Testing
To be able to test this application in a device:
Prerequisites:
	Before running the app, please make sure that an emulator or an android device is running locally. To be able to run the app on a device, connect the device on the computer and enable USB Debugging. After that, follow the commands below.
    
1. Navigate to the wallshop.app folder on git bash.
2. Run ionic cordova run android

## Retreiving the APK
1. On bash, navigate to the wallshop.app folder.
2. Run ionic cordova build android
3. Open and file explorer and go to C:\Users\{your-current-user}\wallshop.app\platforms\android\build\outputs\apk\
4. A file named android-debug.apk should be seen.
