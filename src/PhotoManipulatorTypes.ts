

export interface Point { x: number, y: number }

export interface Size { width: number, height: number }

export interface TextOptions {
  position: Point
  text: string
  textSize?: number
  color?: string
  thickness?: number
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export type ImageSource = string | number

type PhotoBatchPrintText = { operation: "text", options: TextOptions }
type PhotoBatchOverlay = { operation: "overlay", overlay: ImageSource, position: Point }

export type PhotoBatchOperations = PhotoBatchPrintText | PhotoBatchOverlay;

export interface PhotoManipulatorStatic {
  batch: (image: ImageSource, size: Size, quality: number, operations: Array<PhotoBatchOperations>) => Promise<string>
  overlayImage: (image: ImageSource, overlay: ImageSource, position: Point) => Promise<string>
  printText: (image: ImageSource, texts: Array<TextOptions>) => Promise<string>
  optimize: (image: ImageSource, quality: number) => Promise<string>
}