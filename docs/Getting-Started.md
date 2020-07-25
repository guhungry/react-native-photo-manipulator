# React Native Photo Manipulator Getting Started Guide

## 1. Add react-native-photo-manipulator to your dependencies.
```shell
$ yarn add react-native-photo-manipulator
```

(or)

```shell
$ npm install react-native-photo-manipulator
```

## 2. Link native modules.
From react-native 0.60 [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) will take care of the link step but don't forget to run `pod install`. So you can skip to [next section](#3-import-library-and-use).

For react-native 0.59.x and below. React Native modules that include native Objective-C, Swift, Java, or Kotlin code have to be "linked" so that the compiler knows to include them in the app.

### Automatic installation
```shell
$ react-native link react-native-photo-manipulator
```

_NOTE: If you ever need to uninstall React Native Photo Manipulator, run react-native unlink react-native-photo-manipulator to unlink it._

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-photo-manipulator` and add `RNPhotoManipulator.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNPhotoManipulator.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.guhungry.rnphotomanipulator.RNPhotoManipulatorPackage;` to the imports at the top of the file
  - Add `new RNPhotoManipulatorPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
```gradle
include ':react-native-photo-manipulator'
project(':react-native-photo-manipulator').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-photo-manipulator/android')
```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
```gradle
  implementation project(':react-native-photo-manipulator')
```

## 3. Import library and use.
```typescript
import RNPhotoManipulator from 'react-native-photo-manipulator';

const image = "https://github.com/guhungry/react-native-photo-manipulator/raw/master/docs/demo-background.jpg";
const cropRegion = { x: 5, y: 30, size: 400, width: 250 };
const targetSize = { size: 200, width: 150 };

PhotoManipulator.crop(image, cropRegion, targetSize).then(path => {
    console.log(`Result image path: ${path}`);
});
```
Learn more about [API](/README.md#api)
