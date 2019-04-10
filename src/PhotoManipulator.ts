import { NativeModules } from 'react-native'
import { ImageSource, PhotoBatchOperations, PhotoManipulatorStatic, Point, Rect, Size, TextOptions } from "./PhotoManipulatorTypes"
import * as ParamUtils from "./ParamUtils";

const { RNPhotoManipulator } = NativeModules;

const PhotoManipulator: PhotoManipulatorStatic = {
    batch: (image: ImageSource, operations: PhotoBatchOperations[], cropRegion: Rect, targetSize?: Size, quality: number = 100) => {
        return RNPhotoManipulator.batch(ParamUtils.toImageNative(image), operations.map(ParamUtils.toBatchNative), cropRegion, targetSize, quality)
    },
    crop: (image: ImageSource, cropRegion: Rect, targetSize?: Size) => RNPhotoManipulator.crop(ParamUtils.toImageNative(image), cropRegion, targetSize),
    overlayImage: (image: ImageSource, overlay: ImageSource, position: Point) => RNPhotoManipulator.overlayImage(ParamUtils.toImageNative(image), ParamUtils.toImageNative(overlay), position),
    printText: (image: ImageSource, texts: TextOptions[]) => RNPhotoManipulator.printText(ParamUtils.toImageNative(image), texts.map(ParamUtils.toTextOptionsNative)),
    optimize: (image: ImageSource, quality: number) => RNPhotoManipulator.optimize(ParamUtils.toImageNative(image), quality),
};

export default PhotoManipulator
