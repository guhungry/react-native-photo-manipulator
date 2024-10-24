export enum TextDirection {
  /**
   * Left-to-Right text direction (e.g., English, Spanish)
   */
  LTR = 'ltr',

  /**
   * Right-to-Left text direction (e.g., Arabic, Hebrew)
   */
  RTL = 'rtl',
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
export interface Rect extends Size, Point {}

export interface TextOptions {
  position: Point;
  text: string;
  textSize: number;
  fontName?: string;
  color?: string | Color;
  thickness?: number;
  rotation?: number;
  shadowRadius?: number;
  shadowOffset?: Point;
  shadowColor?: string | Color;
  direction?: TextDirection;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ImageSource = string | number;

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

export enum FlipMode {
  Both = 'Both',
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
}

export enum RotationMode {
  R90 = 'R90',
  R180 = 'R180',
  R270 = 'R270',
}

interface PhotoBatchPrintText {
  operation: 'text';
  options: TextOptions;
}
interface PhotoBatchOverlay {
  operation: 'overlay';
  overlay: ImageSource;
  position: Point;
}
interface PhotoBatchFlip {
  operation: 'flip';
  mode: FlipMode;
}
interface PhotoBatchRotate {
  operation: 'rotate';
  mode: RotationMode;
}

export type PhotoBatchOperations =
  | PhotoBatchPrintText
  | PhotoBatchOverlay
  | PhotoBatchFlip
  | PhotoBatchRotate;
