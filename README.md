# React-Native-Photo-Manipulator
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
  - Add `import com.reactlibrary.RNPhotoManipulatorPackage;` to the imports at the top of the file
  - Add `new RNPhotoManipulatorPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-photo-manipulator'
  	project(':react-native-photo-manipulator').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-photo-manipulator/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-photo-manipulator')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNPhotoManipulator.sln` in `node_modules/react-native-photo-manipulator/windows/RNPhotoManipulator.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Photo.Manipulator.RNPhotoManipulator;` to the usings at the top of the file
  - Add `new RNPhotoManipulatorPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNPhotoManipulator from 'react-native-photo-manipulator';

// TODO: What to do with the module?
RNPhotoManipulator;
```
