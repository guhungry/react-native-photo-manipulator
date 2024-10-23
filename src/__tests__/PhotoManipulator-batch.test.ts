import { NativeModules } from 'react-native';
import 'jest-extended';
import PhotoManipulator from '../PhotoManipulator';
import { toImageNative } from '../ParamUtils';
import { MimeType } from '../PhotoManipulatorTypes';

describe('Photo Manipulator', () => {
  describe('batch()', () => {
    const imageUrl =
      'https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg';
    const imageRequire = require.resolve('../../docs/test.png');
    const cropRegion = { x: 30, y: 10, height: 400, width: 300 };
    const targetSize = { width: 300, height: 200 };
    const quality = 85;

    test('all parameters', () => {
      PhotoManipulator.batch(imageUrl, [], cropRegion, targetSize, quality);
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [],
        cropRegion,
        targetSize,
        quality,
        MimeType.JPEG
      );
    });

    test('support png', () => {
      PhotoManipulator.batch(
        imageUrl,
        [],
        cropRegion,
        targetSize,
        quality,
        MimeType.PNG
      );
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [],
        cropRegion,
        targetSize,
        quality,
        MimeType.PNG
      );
    });

    test('missing quality. use default = 100', () => {
      PhotoManipulator.batch(imageUrl, [], cropRegion, targetSize);
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [],
        cropRegion,
        targetSize,
        100,
        MimeType.JPEG
      );
    });

    test('missing targetSize and quality', () => {
      PhotoManipulator.batch(imageUrl, [], cropRegion);
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [],
        cropRegion,
        undefined,
        100,
        MimeType.JPEG
      );
    });

    test('support require image', () => {
      PhotoManipulator.batch(imageRequire, [], cropRegion, targetSize, quality);
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        toImageNative(imageRequire),
        [],
        cropRegion,
        targetSize,
        quality,
        MimeType.JPEG
      );
    });

    test('convert operation text', () => {
      PhotoManipulator.batch(
        imageUrl,
        [
          {
            operation: 'text',
            options: {
              position: { x: 4, y: 12 },
              text: 'PRINT ME',
              textSize: 30,
              color: '#233211',
              thickness: 0,
            },
          },
        ],
        cropRegion
      );
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [
          {
            operation: 'text',
            options: {
              color: { a: 255, b: 17, g: 50, r: 35 },
              position: { x: 4, y: 12 },
              rotation: 0,
              shadowColor: undefined,
              shadowRadius: 0,
              text: 'PRINT ME',
              textSize: 30,
              thickness: 0,
              direction: 'ltr',
            },
          },
        ],
        cropRegion,
        undefined,
        100,
        MimeType.JPEG
      );
    });

    test('convert operation overlay', () => {
      PhotoManipulator.batch(
        imageUrl,
        [
          {
            operation: 'overlay',
            overlay: imageUrl,
            position: { x: 9, y: 31 },
          },
        ],
        cropRegion
      );
      expect(NativeModules.RNPhotoManipulator.batch).toHaveBeenCalledWith(
        imageUrl,
        [
          {
            operation: 'overlay',
            overlay: imageUrl,
            position: { x: 9, y: 31 },
          },
        ],
        cropRegion,
        undefined,
        100,
        MimeType.JPEG
      );
    });
  });
});
