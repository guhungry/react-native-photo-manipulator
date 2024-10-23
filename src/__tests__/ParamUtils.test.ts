import {
  toBatchNative,
  toColorNative,
  toImageNative,
  toTextOptionsNative,
} from '../ParamUtils';
import 'jest-extended';
import { FlipMode, TextDirection } from '../PhotoManipulatorTypes';

describe('ParamUtils', () => {
  describe('toColorNative', () => {
    test('when null', () => {
      expect(toColorNative(undefined)).toEqual({ r: 0, g: 0, b: 0, a: 255 });
    });

    test('when native color do nothing', () => {
      expect(toColorNative({ r: 2, g: 3, b: 4, a: 5 })).toEqual({
        r: 2,
        g: 3,
        b: 4,
        a: 5,
      });
    });

    test('when invalid color should use default color (black)', () => {
      expect(toColorNative('invalid')).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      });
    });

    test('when color name', () => {
      expect(toColorNative('green')).toEqual({
        r: 0,
        g: 128,
        b: 0,
        a: 255,
      });
    });
    test('when hex string (#xxxxxxxx)', () => {
      expect(toColorNative('#123')).toEqual({
        r: 17,
        g: 34,
        b: 51,
        a: 255,
      });
      expect(toColorNative('#5678')).toEqual({
        r: 85,
        g: 102,
        b: 119,
        a: 136,
      });
      expect(toColorNative('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 255 });
      expect(toColorNative('#ffffff')).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 255,
      });
      expect(toColorNative('#54f313')).toEqual({
        r: 84,
        g: 243,
        b: 19,
        a: 255,
      });
      expect(toColorNative('#12345678')).toEqual({
        r: 18,
        g: 52,
        b: 86,
        a: 120,
      });
    });
    test('when rgb[a]()', () => {
      expect(toColorNative('rgb(1,2,3)')).toEqual({ r: 1, g: 2, b: 3, a: 255 });
      expect(toColorNative('rgba(5,6,7,.8)')).toEqual({
        r: 5,
        g: 6,
        b: 7,
        a: 204,
      });
    });
  });

  describe('toImageNative', () => {
    test('when string string', () => {
      expect(
        toImageNative(
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png'
        )
      ).toEqual(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png'
      );
    });

    test('when require.resolve', () => {
      expect(toImageNative(require.resolve('../../docs/test.png'))).toEndWith(
        '/docs/test.png'
      );
    });

    test('when require (mock native module)', () => {
      expect(toImageNative(3342342)).toEqual('3342342');
    });
  });

  describe('toTextOptionsNative', () => {
    test('when no border', () => {
      const value = toTextOptionsNative({
        color: '#663212',
        position: { x: 50, y: 10 },
        text: 'Bee',
        textSize: 32,
        thickness: 0,
        direction: TextDirection.RTL,
      });
      expect(value).toEqual({
        color: { r: 102, b: 18, g: 50, a: 255 },
        position: { x: 50, y: 10 },
        rotation: 0,
        shadowColor: undefined,
        shadowRadius: 0,
        text: 'Bee',
        textSize: 32,
        thickness: 0,
        direction: 'rtl',
      });
    });

    test('when border', () => {
      const value = toTextOptionsNative({
        color: 'aqua',
        position: { x: 15, y: 20 },
        text: 'holla',
        textSize: 2,
        rotation: 3,
        shadowRadius: 2,
        shadowColor: 'brown',
        shadowOffset: { x: 4, y: 3 },
      });
      expect(value).toEqual({
        color: { r: 0, g: 255, b: 255, a: 255 },
        position: { x: 15, y: 20 },
        rotation: 3,
        shadowColor: { r: 165, g: 42, b: 42, a: 255 },
        shadowOffset: { x: 4, y: 3 },
        shadowRadius: 2,
        text: 'holla',
        textSize: 2,
        thickness: 0,
        direction: 'ltr',
      });
    });
  });

  describe('toBatchNative', () => {
    test('when type text', () => {
      let value = toBatchNative({
        operation: 'text',
        options: {
          color: '#a3426f',
          position: { x: 12, y: 27 },
          text: 'TEXT',
          textSize: 22,
          thickness: 1,
        },
      });
      expect(value).toEqual({
        operation: 'text',
        options: {
          color: { r: 163, b: 111, g: 66, a: 255 },
          position: { x: 12, y: 27 },
          rotation: 0,
          shadowColor: undefined,
          shadowRadius: 0,
          text: 'TEXT',
          textSize: 22,
          thickness: 1,
          direction: 'ltr',
        },
      });
    });

    test('when type overlay', () => {
      let value = toBatchNative({
        operation: 'overlay',
        overlay:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png',
        position: { x: 22, y: 73 },
      });
      expect(value).toEqual({
        operation: 'overlay',
        overlay:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png',
        position: { x: 22, y: 73 },
      });
    });

    test('when type flip', () => {
      let value = toBatchNative({
        operation: 'flip',
        mode: FlipMode.Horizontal,
      });
      expect(value).toEqual({
        operation: 'flip',
        mode: FlipMode.Horizontal,
      });
    });
  });
});
