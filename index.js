/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TextEncodingPolyfill from 'text-encoding';
import App from './src/App';
import {name as appName} from './app.json';

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

AppRegistry.registerComponent(appName, () => App);
