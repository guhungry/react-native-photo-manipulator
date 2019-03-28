# React Native Photo Manipulator
Image processing library to edit photo programmatically in React Native

## Getting started

`$ yarn add react-native-photo-manipulator`

### Mostly automatic installation

`$ react-native link react-native-photo-manipulator`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-photo-manipulator` and add `RNPhotoManipulator.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNPhotoManipulator.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.guhungry.rnphotomanipulator.RNPhotoManipulatorPackage;` to the imports at the top of the file
  - Add `new RNPhotoManipulatorPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-photo-manipulator'
  	project(':react-native-photo-manipulator').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-photo-manipulator/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':react-native-photo-manipulator')
  	```


## Usage
Import library with
```javascript
import RNPhotoManipulator from 'react-native-photo-manipulator';
```

### Crop and resize
Crop and resize image

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const cropRegion = { x: 5, y: 30, size: 400, width: 250 };
const targetSize = { size: 200, width: 150 };

PhotoManipulator.crop(image, cropRegion, targetSize).then(path => {
    console.log(`Result image path: ${path}`);
});
```

### Optimize
Save result image with specified quality between `0 - 100` in jpeg format

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const quality = 90;

PhotoManipulator.optimize(image, 90).then(path => {
    console.log(`Result image path: ${path}`);
});
```

### Overlay Image
Overlay image on top of background image

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const overlay = "https://www.iconfinder.com/icons/1174949/download/png/128";
const position = { x: 5, y: 20 };

PhotoManipulator.overlayImage(image, overlay, position).then(path => {
    console.log(`Result image path: ${path}`);
});
```

### Print Text
Print texts into image

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const texts = [
    { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" },
    { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#FFFFFF", thickness: 3 }
];

PhotoManipulator.printText(image, texts).then(path => {
    console.log(`Result image path: ${path}`);
});
```

### Batch
Process image with many operations

```javascript
const image = "https://unsplash.com/photos/qw6qQQyYQpo/download?force=true";
const cropRegion = { x: 5, y: 30, size: 400, width: 250 };
const targetSize = { size: 200, width: 150 };
const operations = [
    { operation: "text", options: { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" } },
    { operation: "overlay", overlay: "https://www.iconfinder.com/icons/1174949/download/png/128", position: { x: 5, y: 20 } },
];
const quality = 90;

PhotoManipulator.batch(image, cropRegion, targetSize, operations, quality).then(path => {
    console.log(`Result image path: ${path}`);
});
```