import { Buffer } from 'buffer';
import { crypto } from 'react-native-crypto';
import { randomBytes } from 'react-native-randombytes';

// Polyfill Buffer
global.Buffer = Buffer;

// Polyfill crypto
global.crypto = {
  getRandomValues: (byteArray) => randomBytes(byteArray.length),
};
