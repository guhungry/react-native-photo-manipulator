// add all jest-extended matchers
import { expect, jest } from '@jest/globals';
import * as matchers from 'jest-extended';
expect.extend(matchers);

// Mock NativeModules
import { NativeModules } from 'react-native';

NativeModules.RNPhotoManipulator = {
  batch: jest.fn(),
  crop: jest.fn(),
  overlayImage: jest.fn(),
  printText: jest.fn(),
  optimize: jest.fn(),
};

// Reset the mocks before each test
global.beforeEach(jest.resetAllMocks);
