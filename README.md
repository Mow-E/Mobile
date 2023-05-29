# Mow-E Mobile
This is the mobile app for the Mow-E system developed for the Intelligent Mobile Systems course.
It's a cross-platform mobile app developed with React Native.

## Project Setup
1. [Install system-wide prerequisites](https://reactnative.dev/docs/environment-setup)
2. Clone the repository
3. Install dependencies: `npm install`, also `npx pod-install` if building the project for iOS

## Run App on Mobile Device / Simulator
1. Setup project and make sure that all dependencies are installed
2. Make sure the device has developer options enabled and [is set-up for running a react-native app](https://reactnative.dev/docs/running-on-device)
3. Start metro in separate terminal: `npm start` or `npx react-native start`
4. For iOS: `npx react-native run-ios`, run `npx react-native run-ios -h` for options like specific device/simulator names
5. For Android: `npx react-native run-android`, run `npx react-native run-android` for options like specific device/simulator ids
6. Important option to note for both platforms: `--mode Debug` / `--mode Release` installs and runs the respective version of the app, where `Debug` supports a connection to the metro dev server and hot reloads, while `Release` is a full build that stands and runs on its own

## Development

### Related External Tools and Repositories
* [The other repos in our organization](https://github.com/Mow-E)
* [Figma](https://www.figma.com/file/FkpZXjc701EAHtMdWcejod/Mow-E-App?type=design&node-id=0%3A1&t=kjfO0ToFS6uHQ9PC-1): our design document
* [SVGR](https://react-svgr.com/playground/?icon=true&native=true&svgo=false&typescript=true): useful to convert `.svg` files into react components
* The React Native [guides](https://reactnative.dev/docs/getting-started) and [components reference](https://reactnative.dev/docs/components-and-apis)

### Overview and Testing
The react-native based source lies in [`/src`](/src) and the automated tests lie in  [`/__tests__`](/__tests__).

### Nice-to-Know and Known Issues
* In `Debug` mode nearly everything is logged. That's nice to see what's going on under the hood, but it also slows down performance drastically. Logs can be disabled, e.g. with the `transform-remove-console` babel plugin in [`/babel.config.js`](babel.config.js). This is automatically done for the `Release` mode, but when developing things like the WebSocket connection and the map one might want to disable logs, otherwise the app becomes unresponsive in `Debug` mode.
* The map drawing is just a simple prototype feature and not fully stable. It might happen that the size of the map is not always updated as it should be or that the current position marker runs outside the current borders.
* iOS and Android handle some displaying-related things differently, so there might be some differences or slight UI-bugs (very rarely).
