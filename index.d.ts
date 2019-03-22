import {ImageSource, PhotoBatchOperations, Point, Size, TextOptions} from './lib/PhotoManipulatorTypes';

interface PhotoManipulator {
  batch: (image: ImageSource, size: Size, quality: number, operations: Array<PhotoBatchOperations>) => Promise<string>
  overlayImage: (image: ImageSource, overlay: ImageSource, position: Point) => Promise<string>
  printText: (image: ImageSource, texts: Array<TextOptions>) => Promise<string>
  optimize: (image: ImageSource, quality: number) => Promise<string>
  resize: (image: ImageSource, targetSize: Size) => Promise<string>
};

export { PhotoManipulator };
export default PhotoManipulator;
