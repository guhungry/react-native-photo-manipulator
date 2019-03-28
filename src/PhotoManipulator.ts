
import { NativeModules } from 'react-native'
import {
    ImageSource,
    PhotoBatchOperations,
    PhotoManipulatorStatic,
    Size,
    TextOptions
} from "./PhotoManipulatorTypes"
import {ParamUtils} from "./ParamUtils";

const { RNPhotoManipulator } = NativeModules;

const PhotoManipulator: PhotoManipulatorStatic = {
    batch: (image: ImageSource, size: Size, quality: number, operations: PhotoBatchOperations[]) => {
        return RNPhotoManipulator.batch(image, size, quality, operations.map(ParamUtils.toBatchNative))
    },
    overlayImage: RNPhotoManipulator.overlayImage,
    printText: (image: ImageSource, texts: TextOptions[]) => RNPhotoManipulator.printText(image, texts.map(ParamUtils.toTextOptionsNative)),
    optimize: RNPhotoManipulator.optimize,
    resize: RNPhotoManipulator.resize
};

export default PhotoManipulator
