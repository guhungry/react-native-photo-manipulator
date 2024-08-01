// add all jest-extended matchers
import { expect, jest } from '@jest/globals';
import * as matchers from 'jest-extended';
expect.extend(matchers);

// Mock NativeModules
import { Image, NativeModules } from 'react-native';

NativeModules.RNPhotoManipulator = {
  batch: jest.fn(),
  crop: jest.fn(),
  overlayImage: jest.fn(),
  printText: jest.fn(),
  optimize: jest.fn(),
  flipImage: jest.fn(),
  rotateImage: jest.fn(),
};

Image.resolveAssetSource = (source) => ({
  uri: JSON.stringify(source),
});

// Reset the mocks before each test
global.beforeEach(jest.resetAllMocks);
