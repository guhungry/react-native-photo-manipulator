# React Native Photo Manipulator
[![npm version](http://img.shields.io/npm/v/react-native-photo-manipulator.svg?style=flat)](https://npmjs.org/package/react-native-photo-manipulator "View this project on npm")
[![build](https://github.com/guhungry/react-native-photo-manipulator/actions/workflows/test-and-rebuild.yml/badge.svg?branch=master&event=push)](https://github.com/guhungry/react-native-photo-manipulator/actions/workflows/test-and-rebuild.yml)

React Native Image Processing API to edit photo programmatically for Android and iOS.

[demo.webm](https://github.com/guhungry/react-native-photo-manipulator/assets/4032276/8b22be79-9b1c-455d-9ce7-e92509e1c019)

## Platform Supported
* [x] Android
* [x] iOS

## Getting started
### For react native 0.60 and above

```shell
$ yarn add react-native-photo-manipulator
```
(or)
```shell
$ npm install react-native-photo-manipulator
```
### For react native 0.59 and below
Please read [Get Started Guide](docs/Getting-Started.md)

## Usage
Import library with
```javascript
import RNPhotoManipulator from 'react-native-photo-manipulator';
```

## API
* __Methods:__
  * [`crop()`](README.md#crop-and-resize)
  * [`optimize()`](README.md#optimize)
  * [`flipImage()`](README.md#flip-image)
  * [`rotateImage()`](README.md#rotate-image)
  * [`overlayImage()`](README.md#overlay-image)
  * [`printText()`](README.md#print-text)
  * [`batch()`](README.md#batch)
  
* __Types:__
    * [`ImageSource`](README.md#imagesource)
    * [`PhotoBatchOperations`](README.md#photobatchoperations)
    * [`PhotoBatchOverlay`](README.md#photobatchoperations)
    * [`PhotoBatchPrintText`](README.md#photobatchoperations)
    * [`PhotoBatchFlip`](README.md#photobatchoperations)
    * [`PhotoBatchRotate`](README.md#photobatchoperations)
    * [`FlipMode`](README.md#flipmode)
    * [`RotationMode`](README.md#rotationmode)
    * [`Point`](README.md#point)
    * [`Rect`](README.md#rect)
    * [`Size`](README.md#size)
    * [`TextOptions`](README.md#textoptions)
### Method
#### Crop and resize
Crop image with `cropRegion` and resize to `targetSize` if specified

##### Signature
```typescript
static crop(image: ImageSource, cropRegion: Rect, targetSize?: Size) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                    |
| --------------- | ----------------------------------------- | ------------ | ---------------------------------------------- |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The image                                      |
| `cropRegion`    | [`Rect`](README.md#rect)                  | Yes          | The region of image to be cropped              |
| `targetSize`    | [`Size`](README.md#size)                  | No           | The target size of result image                |
| `mimeType`      | 'image/jpeg', 'image/png'                 | No           | Output file format                             |


##### Returns
Promise with image path in cache directory

##### Example

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const cropRegion = { x: 5, y: 30, height: 400, width: 250 };
const targetSize = { height: 200, width: 150 };

RNPhotoManipulator.crop(image, cropRegion, targetSize).then(path => {
    console.log(`Result image path: ${path}`);
});
```

<img align="left" src="/docs/result-crop.jpg?raw=true" alt="Result Crop" width="100" />
<img src="/docs/result-crop-resize.jpg?raw=true" alt="Result Crop and Resize" width="100" />

#### Optimize
Save result `image` with specified `quality` between `0 - 100` in jpeg format


##### Signature
```typescript
static optimize(image: ImageSource, quality: number) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                    |
| --------------- | ----------------------------------------- | ------------ | ---------------------------------------------- |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The image                                      |
| `quality`       | number                                    | Yes          | The quality of result image between `0 - 100`  |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-optimize.jpg?raw=true" alt="Result Optimize" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const quality = 90;

RNPhotoManipulator.optimize(image, 90).then(path => {
    console.log(`Result image path: ${path}`);
});
```

#### Flip Image
Flip image horizontally, vertically or both

##### Signature
```typescript
static flipImage(image: ImageSource, mode: FlipMode) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                            |
| --------------- | ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The background image                                   |
| `mode`          | [`FlipMode`](README.md#flipmode)          | Yes          | Flip mode Horizontal, Vertical or Both                 |
| `mimeType`      | 'image/jpeg', 'image/png'                 | No           | Output file format                                     |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-flip.png?raw=true" alt="Result Flip" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const mode = FlipMode.Vertical;

RNPhotoManipulator.flipImage(image, mode).then(path => {
    console.log(`Result image path: ${path}`);
});
```

#### Rotate Image
Rotate image 90° (90° Clockwise), 180° (Half Rotation) or 270° (90° Counterclockwise)

##### Signature
```typescript
static rotateImage(image: ImageSource, mode: RotationMode) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                            |
| --------------- | ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The background image                                   |
| `mode`          | [`RotationMode`](README.md#rotationmode)  | Yes          | Rotation mode 90° (90° Clockwise), 180° (Half Rotation) or 270° (90° Counterclockwise)                 |
| `mimeType`      | 'image/jpeg', 'image/png'                 | No           | Output file format                                     |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-rotate.png?raw=true" alt="Result Rotate" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const mode = RotationMode.R90;

RNPhotoManipulator.rotateImage(image, mode).then(path => {
    console.log(`Result image path: ${path}`);
});
```

#### Overlay Image
Overlay image on top of background image

##### Signature
```typescript
static overlayImage(image: ImageSource, overlay: ImageSource, position: Point) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                            |
| --------------- | ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The background image                                   |
| `overlay`       | [`ImageSource`](README.md#imagesource)    | Yes          | The overlay image                                      |
| `position`      | [`Point`](README.md#point)                | Yes          | The position of overlay image in background image      |
| `mimeType`      | 'image/jpeg', 'image/png'                 | No           | Output file format                                     |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-overlay.jpg?raw=true" alt="Result Overlay" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const overlay = "https://www.iconfinder.com/icons/1174949/download/png/128";
const position = { x: 5, y: 20 };

RNPhotoManipulator.overlayImage(image, overlay, position).then(path => {
    console.log(`Result image path: ${path}`);
});
```

#### Print Text
Print texts into image

##### Signature
```typescript
static printText(image: ImageSource, texts: TextOptions[]) => Promise<string>
```

| Parameter       | Type                                      | Required     | Description                                            |
| --------------- | ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `image`         | [`ImageSource`](README.md#imagesource)    | Yes          | The image                                              |
| `texts`         | [`TextOptions[]`](README.md#textoptions)  | Yes          | The list of text operations                            |
| `mimeType`      | 'image/jpeg', 'image/png'                 | No           | Output file format                                     |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-print-text.jpg?raw=true" alt="Result Print Text" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const texts = [
    { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" },
    { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#FFFFFF", thickness: 3 }
];

RNPhotoManipulator.printText(image, texts).then(path => {
    console.log(`Result image path: ${path}`);
});
```

#### Batch
Crop, resize and do operations (overlay and printText) on image

##### Signature
```typescript
static batch(image: ImageSource, operations: PhotoBatchOperations[], cropRegion: Rect, targetSize?: Size, quality?: number) => Promise<string>
```

| Parameter       | Type                                                        | Required     | Description                                       |
| --------------- | ----------------------------------------------------------- | ------------ | ------------------------------------------------- |
| `image`         | [`ImageSource`](README.md#imagesource)                      | Yes          | The image                                         |
| `operations`    | [`PhotoBatchOperations[]`](README.md#photobatchoperations)  | Yes          | The list of operations                            |
| `cropRegion`    | [`Rect`](README.md#rect)                                    | Yes          | The region of image to be cropped                 |
| `targetSize`    | [`Size`](README.md#size)                                    | No           | The target size of result image                   |
| `quality`       | number                                                      | No           | The quality of result image between `0 - 100`     |
| `mimeType`      | 'image/jpeg', 'image/png'                                   | No           | Output file format                                |

##### Returns
Promise with image path in cache directory

##### Example

<img align="right" src="/docs/result-batch.jpg?raw=true" alt="Result Batch" width="100" />

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const cropRegion = { x: 5, y: 30, height: 400, width: 250 };
const targetSize = { height: 200, width: 150 };
const operations = [
    { operation: "text", options: { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" } },
    { operation: "overlay", overlay: "https://www.iconfinder.com/icons/1174949/download/png/128", position: { x: 5, y: 20 } },
];
const quality = 90;

RNPhotoManipulator.batch(image, operations, cropRegion, targetSize, quality).then(path => {
    console.log(`Result image path: ${path}`);
});
```

### Types
#### ImageSource
Image resource can be url or require()

| Type      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| number    | Image from require('path/to/image')                              |
| string    | Image from url supports file://, http://, https:// and ftp://    |

#### PhotoBatchOperations
Represent [overlay image](README.md#photobatchoverlay), [print text](README.md#photobatchprinttext) or [flip](README.md#photobatchflip) operation

#### PhotoBatchOverlay
Overlay image batch operation

| Property        | Type                                      | Description                                           |
| --------------- | ----------------------------------------- | ----------------------------------------------------- |
| `operation`     | "overlay"                                 |                                                       |
| `overlay`       | [`ImageSource`](README.md#imagesource)    | The overlay image                                     |
| `position`      | [`Point`](README.md#point)                | he position of overlay image in background image      |

#### PhotoBatchPrintText
Print text batch operation

| Property        | Type                                      | Description                          |
| --------------- | ----------------------------------------- | ------------------------------------ |
| `operation`     | "text"                                    |                                      |
| `options`       | [`TextOptions`](README.md#textoptions)    | The text attributes                  |

#### PhotoBatchFlip
Flip image batch operation

| Property        | Type                                      | Description                            |
| --------------- | ----------------------------------------- | -------------------------------------- |
| `operation`     | "flip"                                    |                                        |
| `mode`          | [`FlipMode`](README.md#flipmode)          | Flip mode Vertical, Horizontal or Both |

#### PhotoBatchRotate
Rotate image batch operation

| Property        | Type                                      | Description                            |
| --------------- | ----------------------------------------- | -------------------------------------- |
| `operation`     | "rotate"                                    |                                        |
| `mode`          | [`RotationMode`](README.md#rotationmode)          | Rotation mode 90° (90° Clockwise), 180° (Half Rotation) or 270° (90° Counterclockwise) |

#### FlipMode
Enum represent flip Mode

| Enum            | Description                          |
| --------------- | ------------------------------------ |
| Horizontal      | Flip horizontal (y-axis)             |
| Vertical        | Flip vertical (x-asis)               |
| Both            | Flip vertical and horizontal         |

#### RotationMode
Enum represent rotation Mode

| Enum            | Description                          |
| --------------- | ------------------------------------ |
| R90             | Rotate 90° (90° Clockwise)           |
| R180            | Rotate 180° (Half Rotation)          |
| R270            | Rotate 270° (90° Counterclockwise)   |

#### Point
Represent position (x, y) from top-left of image

| Property        | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `x`             | number    | The x-axis coordinate from top-left  |
| `y`             | number    | The y-axis coordinate from top-left  |

#### Rect
Represent area of region

| Property        | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `x`             | number    | The x-axis coordinate from top-left  |
| `y`             | number    | The y-axis coordinate from top-left  |
| `width`         | number    | The width of the region              |
| `height`        | number    | The height of the region             |

#### Size
Represent size (width, height) of region or image

| Property        | Type      | Description              |
| --------------- | --------- | ------------------------ |
| `width`         | number    | The width of the region  |
| `height`        | number    | The height of the region |

#### TextOptions
Represent attributes of text such as text, color, size, and etc.

| Property        | Type                          | Required | Description                                    |
| --------------- | ----------------------------- | -------- | ---------------------------------------------- |
| `position`      | [`Point`](README.md#point)    | Yes      | The position of the text in background image   |
| `text`          | string                        | Yes      | The value of the text                          |
| `textSize`      | number                        | Yes      | The size of the text                           |
| `fontName`      | string                        | No       | The font name that can resolve by React Native<br/>iOS: Use "PostScript name"<br/>Android: Use filename |
| `color`         | string                        | No       | The color of the text                          |
| `thickness`     | number                        | No       | The thickness (border width) of the region     |
| `rotation`      | number                        | No       | The rotation of text in degrees                |
