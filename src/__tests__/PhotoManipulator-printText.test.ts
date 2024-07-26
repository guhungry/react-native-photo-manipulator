import { NativeModules } from 'react-native';
import 'jest-extended';
import PhotoManipulator from '../PhotoManipulator';
import { toImageNative } from '../ParamUtils';
import { MimeType } from '../PhotoManipulatorTypes';

describe('Photo Manipulator', () => {
  describe('printText()', () => {
    const imageUrl =
      'https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg';
    const imageRequire = require.resolve('../../docs/test.png');

    test('with network source', () => {
      PhotoManipulator.printText(imageUrl, []);
      expect(NativeModules.RNPhotoManipulator.printText).toHaveBeenCalledWith(
        imageUrl,
        [],
        MimeType.JPEG
      );
    });

    test('with require source', () => {
      PhotoManipulator.printText(imageRequire, []);
      expect(NativeModules.RNPhotoManipulator.printText).toHaveBeenCalledWith(
        toImageNative(imageRequire),
        [],
        MimeType.JPEG
      );
    });

    test('support png', () => {
      PhotoManipulator.printText(imageRequire, [], MimeType.PNG);
      expect(NativeModules.RNPhotoManipulator.printText).toHaveBeenCalledWith(
        toImageNative(imageRequire),
        [],
        MimeType.PNG
      );
    });

    test('convert text operations', () => {
      PhotoManipulator.printText(imageUrl, [
        {
          position: { x: 65, y: 70 },
          text: 'TEXT MAE',
          textSize: 45,
          color: 'white',
          thickness: 0,
        },
        {
          position: { x: 65, y: 70 },
          text: 'TEXT MAE',
          textSize: 45,
          color: 'black',
          thickness: 3,
          rotation: 3,
        },
      ]);
      expect(NativeModules.RNPhotoManipulator.printText).toHaveBeenCalledWith(
        imageUrl,
        [
          {
            color: { r: 255, g: 255, b: 255, a: 255 },
            position: { x: 65, y: 70 },
            rotation: 0,
            shadowColor: undefined,
            shadowRadius: 0,
            text: 'TEXT MAE',
            textSize: 45,
            thickness: 0,
          },
          {
            color: { r: 0, g: 0, b: 0, a: 255 },
            position: { x: 65, y: 70 },
            rotation: 3,
            shadowColor: undefined,
            shadowRadius: 0,
            text: 'TEXT MAE',
            textSize: 45,
            thickness: 3,
          },
        ],
        MimeType.JPEG
      );
    });
  });
});
