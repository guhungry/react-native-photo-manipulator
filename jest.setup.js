import { NativeModules } from "react-native"

NativeModules.RNPhotoManipulator = {
    batch: jest.fn(),
    crop: jest.fn(),
    overlayImage: jest.fn(),
    printText: jest.fn(),
    optimize: jest.fn(),
};

// Reset the mocks before each test
global.beforeEach(jest.resetAllMocks);
