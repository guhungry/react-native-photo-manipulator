import { NativeModules } from 'react-native'
import { ImageSource, PhotoBatchOperations, PhotoManipulatorStatic, Rect, Size, TextOptions } from "./PhotoManipulatorTypes"
import * as ParamUtils from "./ParamUtils";

const { RNPhotoManipulator } = NativeModules;

const PhotoManipulator: PhotoManipulatorStatic = {
    batch: (image: ImageSource, operations: PhotoBatchOperations[], cropRegion: Rect, targetSize?: Size, quality: number = 100) => {
        return RNPhotoManipulator.batch(image, operations.map(ParamUtils.toBatchNative), cropRegion, targetSize, quality)
    },
    crop: (image: ImageSource, cropRegion: Rect, targetSize?: Size) => RNPhotoManipulator.crop(image, cropRegion, targetSize),
    overlayImage: RNPhotoManipulator.overlayImage,
    printText: (image: ImageSource, texts: TextOptions[]) => RNPhotoManipulator.printText(image, texts.map(ParamUtils.toTextOptionsNative)),
    optimize: RNPhotoManipulator.optimize,
};

export default PhotoManipulator
