import {
  FlipMode,
  ImageSource,
  MimeType,
  PhotoBatchOperations,
  Point,
  Rect,
  RotationMode,
  Size,
  TextOptions,
} from './PhotoManipulatorTypes';

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
  batch: (
    image: ImageSource,
    operations: PhotoBatchOperations[],
    cropRegion: Rect,
    targetSize?: Size,
    quality?: number,
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Crop image with cropRegion and resize to targetSize if specified
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param cropRegion (required) Region in { x, y, width, height }
   * @param targetSize (optional) Size in { width, height }
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  crop: (
    image: ImageSource,
    cropRegion: Rect,
    targetSize?: Size,
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Flip Image horizontally or vertically
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param mode (required) Flip mode Horizontal or Vertical
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  flipImage: (
    image: ImageSource,
    mode: FlipMode,
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Rotate Image 90°, 180° or 270°
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param mode (required) 90° (90° Clockwise), 180° (Half Rotation) or 270° (90° Counterclockwise)
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  rotateImage: (
    image: ImageSource,
    mode: RotationMode,
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Overlay image on top of background image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param overlay (required) Uri of image can be http://, https://, file:// and require()
   * @param position (required) Position of overlay image in { x, y }
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  overlayImage: (
    image: ImageSource,
    overlay: ImageSource,
    position: Point,
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Print texts into image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param texts (required) List of text operations
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  printText: (
    image: ImageSource,
    texts: TextOptions[],
    mimeType?: MimeType,
  ) => Promise<string>;

  /**
   * Save result image with specified quality between `0 - 100` in jpeg format
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param quality (required) quality of image between 0 - 100
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  optimize: (image: ImageSource, quality: number) => Promise<string>;
}
