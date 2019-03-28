

export interface Point { x: number, y: number }

export interface Size { width: number, height: number }
export interface Rect extends Size, Point {}

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

interface PhotoBatchPrintText { operation: "text", options: TextOptions }
interface PhotoBatchOverlay { operation: "overlay", overlay: ImageSource, position: Point }

export type PhotoBatchOperations = PhotoBatchPrintText | PhotoBatchOverlay

export interface PhotoManipulatorStatic {
  batch: (image: ImageSource, operations: PhotoBatchOperations[], cropRegion: Rect, targetSize?: Size, quality?: number) => Promise<string>
  crop: (image: ImageSource, cropRegion: Rect, targetSize?: Size) => Promise<string>
  overlayImage: (image: ImageSource, overlay: ImageSource, position: Point) => Promise<string>
  printText: (image: ImageSource, texts: TextOptions[]) => Promise<string>
  optimize: (image: ImageSource, quality: number) => Promise<string>
}