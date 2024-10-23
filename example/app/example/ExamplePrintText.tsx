import * as React from 'react';
import { Image, Text } from 'react-native';
import styles, { ImageResultProps } from '../App.styles';
import { noop } from '../utils';
import PhotoManipulator, { MimeType } from 'react-native-photo-manipulator';
import type { TextOptions } from 'react-native-photo-manipulator';
import { IMAGE } from './settings';

export default React.memo(function ExamplePrintText() {
  const [image, setImage] = React.useState<string | null>(null);
  const [imagePng, setImagePng] = React.useState<string | null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.printText(IMAGE, texts()));
      setImagePng(
        await PhotoManipulator.printText(IMAGE, texts(), MimeType.PNG)
      );
    };

    operation().then(noop).catch(console.log);
  }, []);

  return (
    <>
      {typeof image === 'string' ? (
        <Text style={styles.exampleDescription}>JPEG</Text>
      ) : null}
      {typeof image === 'string' ? (
        <Image
          testID="printTextResult"
          {...ImageResultProps}
          source={{ uri: image }}
        />
      ) : null}
      {typeof imagePng === 'string' ? (
        <Text style={styles.exampleDescription}>PNG</Text>
      ) : null}
      {typeof imagePng === 'string' ? (
        <Image
          testID="printTextPngResult"
          {...ImageResultProps}
          source={{ uri: imagePng }}
        />
      ) : null}
    </>
  );

  function texts(): TextOptions[] {
    return [
      {
        text: 'Test Shadow',
        color: 'red',
        textSize: 300,
        position: { x: 80, y: 50 },
        thickness: 30,
        shadowRadius: 10,
        shadowOffset: { x: 5, y: 10 },
        shadowColor: 'green',
      },
      {
        text: 'Test Shadow',
        color: 'blue',
        textSize: 300,
        position: { x: 80, y: 50 },
      },
      {
        text: 'Test Print Text',
        color: 'black',
        textSize: 300,
        position: { x: 80, y: 550 },
        thickness: 4,
      },
      {
        text: 'Test Print Text',
        color: 'white',
        textSize: 300,
        position: { x: 80, y: 550 },
      },
      {
        text: 'Test Print Text 2',
        color: 'blue',
        textSize: 300,
        position: { x: 100, y: 1050 },
        thickness: 4,
      },
      {
        text: 'Test Print Text 2',
        color: 'brown',
        textSize: 300,
        position: { x: 100, y: 1050 },
      },
      {
        text: 'Test Print Text 3',
        color: 'green',
        textSize: 300,
        position: { x: 180, y: 1550 },
      },
      {
        text: 'Test Print Text 3',
        color: 'pink',
        textSize: 30,
        position: { x: 280, y: 1200 },
        rotation: 30,
      },
      {
        text: 'اَلْعَرَبِيَّةُ',
        color: 'red',
        textSize: 500,
        position: { x: 80, y: 300 },
        thickness: 30,
        shadowRadius: 10,
        shadowOffset: { x: 5, y: 10 },
        shadowColor: 'green',
      },
      {
        text: 'اَلْعَرَبِيَّةُ',
        color: 'blue',
        textSize: 500,
        position: { x: 80, y: 300 },
      },
    ];
  }
});
