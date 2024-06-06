import {NativeModules} from 'react-native';
import * as ParamUtils from './ParamUtils';
import {MimeType} from './PhotoManipulatorTypes';
import type {
  FlipMode,
  ImageSource,
  PhotoBatchOperations,
  Point,
  Rect,
  RotationMode,
  Size,
  TextOptions,
} from './PhotoManipulatorTypes';
import {PhotoManipulatorStatic} from './privateTypes';
import TurboModuleRNPhotoManipulator, {Spec} from './NativeRNPhotoManipulator';

// React Native sets `__turboModuleProxy` on global when TurboModules are enabled.
// Currently, this is the recommended way to detect TurboModules.
// https://reactnative.dev/docs/the-new-architecture/backward-compatibility-turbomodules#unify-the-javascript-specs

// @ts-ignore
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RNPhotoManipulator: Spec = isTurboModuleEnabled
  ? TurboModuleRNPhotoManipulator
  : NativeModules.RNPhotoManipulator;

const PhotoManipulator: PhotoManipulatorStatic = {
  batch: (
    image: ImageSource,
    operations: PhotoBatchOperations[],
    cropRegion: Rect,
    targetSize?: Size,
    quality = 100,
    mimeType: MimeType = MimeType.JPEG,
  ) => {
    return RNPhotoManipulator.batch(
      ParamUtils.toImageNative(image),
      operations.map(ParamUtils.toBatchNative),
      cropRegion,
      targetSize,
      quality,
      mimeType,
    );
  },
  crop: (
    image: ImageSource,
    cropRegion: Rect,
    targetSize?: Size,
    mimeType: MimeType = MimeType.JPEG,
  ) =>
    RNPhotoManipulator.crop(
      ParamUtils.toImageNative(image),
      cropRegion,
      targetSize,
      mimeType,
    ),
  flipImage: (
    image: ImageSource,
    mode: FlipMode,
    mimeType: MimeType = MimeType.JPEG,
  ) =>
    RNPhotoManipulator.flipImage(
      ParamUtils.toImageNative(image),
      mode,
      mimeType,
    ),
  rotateImage: (
    image: ImageSource,
    mode: RotationMode,
    mimeType: MimeType = MimeType.JPEG,
  ) =>
    RNPhotoManipulator.rotateImage(
      ParamUtils.toImageNative(image),
      mode,
      mimeType,
    ),
  overlayImage: (
    image: ImageSource,
    overlay: ImageSource,
    position: Point,
    mimeType: MimeType = MimeType.JPEG,
  ) =>
    RNPhotoManipulator.overlayImage(
      ParamUtils.toImageNative(image),
      ParamUtils.toImageNative(overlay),
      position,
      mimeType,
    ),
  printText: (
    image: ImageSource,
    texts: TextOptions[],
    mimeType: MimeType = MimeType.JPEG,
  ) =>
    RNPhotoManipulator.printText(
      ParamUtils.toImageNative(image),
      texts.map(ParamUtils.toTextOptionsNative),
      mimeType,
    ),
  optimize: (image: ImageSource, quality: number) =>
    RNPhotoManipulator.optimize(ParamUtils.toImageNative(image), quality),
};

export default PhotoManipulator;
