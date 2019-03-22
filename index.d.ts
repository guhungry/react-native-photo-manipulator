import { Color, ImageSource, PhotoBatchOperations, PhotoManipulatorStatic, Point, Size, TextOptions } from './lib/PhotoManipulatorTypes';

// Type
export type Color = Color
export type ImageSource = ImageSource
export type PhotoBatchOperations = PhotoBatchOperations
export type Point = Point
export type Size = Size
export type TextOptions = TextOptions

// Native Module
declare var PhotoManipulator: PhotoManipulatorStatic

export { PhotoManipulator };
export default PhotoManipulator;
