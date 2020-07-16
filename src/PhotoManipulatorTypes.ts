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

export type ImageSource = string | number;

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png'
}

interface PhotoBatchPrintText { operation: 'text', options: TextOptions }
interface PhotoBatchOverlay { operation: 'overlay', overlay: ImageSource, position: Point }

export type PhotoBatchOperations = PhotoBatchPrintText | PhotoBatchOverlay;

export interface PhotoManipulatorStatic {
  /**
   * Crop, resize and do operations (overlay and printText) on image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param operations (required) List of image processing operations
   * @param cropRegion (required) Region in { x, y, width, height }
   * @param targetSize (optional) Size in { width, height }
   * @param quality (optional) Quality of result image in `0 - 100`
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  batch: (image: ImageSource, operations: PhotoBatchOperations[], cropRegion: Rect, targetSize?: Size, quality?: number, mimeType?: MimeType) => Promise<string>

  /**
   * Crop image with cropRegion and resize to targetSize if specified
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param cropRegion (required) Region in { x, y, width, height }
   * @param targetSize (optional) Size in { width, height }
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  crop: (image: ImageSource, cropRegion: Rect, targetSize?: Size, mimeType?: MimeType) => Promise<string>

  /**
   * Overlay image on top of background image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param overlay (required) Uri of image can be http://, https://, file:// and require()
   * @param position (required) Position of overlay image in { x, y }
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  overlayImage: (image: ImageSource, overlay: ImageSource, position: Point, mimeType?: MimeType) => Promise<string>

  /**
   * Print texts into image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param texts (required) List of text operations
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  printText: (image: ImageSource, texts: TextOptions[], mimeType?: MimeType) => Promise<string>

  /**
   * Save result image with specified quality between `0 - 100` in jpeg format
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param quality (required) quality of image between 0 - 100
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  optimize: (image: ImageSource, quality: number) => Promise<string>
}
