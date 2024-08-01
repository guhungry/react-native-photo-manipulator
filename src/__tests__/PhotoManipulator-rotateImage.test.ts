import { NativeModules } from 'react-native';
import 'jest-extended';
import PhotoManipulator from '../PhotoManipulator';
import { toImageNative } from '../ParamUtils';
import { MimeType, RotationMode } from '../PhotoManipulatorTypes';

describe('Photo Manipulator', () => {
  describe('flipImage()', () => {
    const imageUrl =
      'https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg';
    const imageRequire = require.resolve('../../docs/test.png');

    test('with network source', () => {
      PhotoManipulator.rotateImage(imageUrl, RotationMode.R180, MimeType.PNG);
      expect(NativeModules.RNPhotoManipulator.rotateImage).toHaveBeenCalledWith(
        imageUrl,
        RotationMode.R180,
        MimeType.PNG
      );
    });

    test('with require source', () => {
      PhotoManipulator.rotateImage(imageRequire, RotationMode.R180);
      expect(NativeModules.RNPhotoManipulator.rotateImage).toHaveBeenCalledWith(
        toImageNative(imageRequire),
        RotationMode.R180,
        MimeType.JPEG
      );
    });
  });
});
