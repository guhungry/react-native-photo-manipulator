

export interface Point { x: number, y: number }

export interface Size { width: number, height: number }

export interface TextOptions {
  location: Point
  text: string
  textSize?: number
  color?: string
  thickness?: number
}

export type ImageSource = string | number

type PhotoBatchPrintText = { operation: "text", options: TextOptions }
type PhotoBatchOverlay = { operation: "overlay", overlay: ImageSource, position: Point }

export type PhotoBatchOperations = PhotoBatchPrintText | PhotoBatchOverlay;
