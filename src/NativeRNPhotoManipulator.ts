import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
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
    image: string,
    operations: Object[],
    cropRegion: Object,
    targetSize?: Object,
    quality?: number,
    mimeType?: string,
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
    image: string,
    cropRegion: Object,
    targetSize?: Object,
    mimeType?: string,
  ) => Promise<string>;

  /**
   * Flip Image horizontally or vertically
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param mode (required) Flip mode Horizontal or Vertical
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  flipImage: (
    image: string,
    mode: string,
    mimeType?: string,
  ) => Promise<string>;

  /**
   * Flip Image horizontally or vertically
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param mode (required) Rotation mode 90° (90° Clockwise), 180° (Half Rotation) or 270° (90° Counterclockwise)
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  rotateImage: (
    image: string,
    mode: string,
    mimeType?: string,
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
    image: string,
    overlay: string,
    position: Object,
    mimeType?: string,
  ) => Promise<string>;

  /**
   * Print texts into image
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param texts (required) List of text operations
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  printText: (
    image: string,
    texts: Object[],
    mimeType?: string,
  ) => Promise<string>;

  /**
   * Save result image with specified quality between `0 - 100` in jpeg format
   *
   * @param image (required) Uri of image can be http://, https://, file:// and require()
   * @param quality (required) quality of image between 0 - 100
   * @param mimeType (optional) Mimetype of output image (image/jpeg, image/png)
   */
  optimize: (image: string, quality: number) => Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('RNPhotoManipulator');
