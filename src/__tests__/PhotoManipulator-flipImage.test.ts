import { NativeModules } from 'react-native';
import 'jest-extended';
import PhotoManipulator from '../PhotoManipulator';
import { toImageNative } from '../ParamUtils';
import { FlipMode, MimeType } from '../PhotoManipulatorTypes';

describe('Photo Manipulator', () => {
  describe('flipImage()', () => {
    const imageUrl =
      'https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg';
    const imageRequire = require.resolve('../../docs/test.png');

    test('with network source', () => {
      PhotoManipulator.flipImage(imageUrl, FlipMode.Vertical, MimeType.PNG);
      expect(NativeModules.RNPhotoManipulator.flipImage).toHaveBeenCalledWith(
        imageUrl,
        FlipMode.Vertical,
        MimeType.PNG
      );
    });

    test('with require source', () => {
      PhotoManipulator.flipImage(imageRequire, FlipMode.Horizontal);
      expect(NativeModules.RNPhotoManipulator.flipImage).toHaveBeenCalledWith(
        toImageNative(imageRequire),
        FlipMode.Horizontal,
        MimeType.JPEG
      );
    });
  });
});
