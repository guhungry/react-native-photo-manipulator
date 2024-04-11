/**
 * Parameter Utilities Class
 */
import {Image} from 'react-native';
import parse from 'parse-color';
import type {
  Color,
  ImageSource,
  PhotoBatchOperations,
  TextOptions,
} from './PhotoManipulatorTypes';

/**
 * Convert color string to rgba object
 * @param color
 */
export const toColorNative = (color?: string | Color): Color => {
  if (color !== undefined && typeof color !== 'string') {
    return color;
  }

  const result = parse(color || '#000000').rgba;
  return {
    r: result[0],
    g: result[1],
    b: result[2],
    a: result[3] * 255,
  };
};

export const toImageNative = (source: ImageSource): string =>
  typeof source === 'string' ? source : Image.resolveAssetSource(source).uri;

export const toTextOptionsNative = (it: TextOptions): TextOptions => ({
  ...it,
  color: toColorNative(it.color),
  thickness: it.thickness || 0,
  rotation: it.rotation || 0,
});

export const toBatchNative = (
  it: PhotoBatchOperations,
): PhotoBatchOperations => {
  if (it.operation === 'text') {
    return {...it, options: toTextOptionsNative(it.options)};
  } else if (it.operation === 'overlay') {
    return {...it, overlay: toImageNative(it.overlay)};
  } else if (it.operation === 'flip') {
    return {...it};
  }
  return it;
};
