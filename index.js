/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './global';
import '@ethersproject/shims';


AppRegistry.registerComponent(appName, () => App);
