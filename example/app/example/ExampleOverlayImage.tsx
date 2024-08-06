import * as React from 'react';
import { Image, Text } from 'react-native';
import styles, { ImageResultProps } from '../App.styles';
import PhotoManipulator, { MimeType } from 'react-native-photo-manipulator';
import { noop } from '../utils';
import { IMAGE, OVERLAY } from './settings';

export default React.memo(function ExampleOverlayImage() {
  const [image, setImage] = React.useState<string | null>(null);
  const [imagePng, setImagePng] = React.useState<string | null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(
        await PhotoManipulator.overlayImage(IMAGE, OVERLAY, {
          x: 800 - 200 - 10,
          y: 600 - 141 - 10,
        })
      );
      setImagePng(
        await PhotoManipulator.overlayImage(
          IMAGE,
          OVERLAY,
          { x: 30, y: 100 },
          MimeType.PNG
        )
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
          testID="overlayImageResult"
          {...ImageResultProps}
          source={{ uri: image }}
        />
      ) : null}
      {typeof imagePng === 'string' ? (
        <Text style={styles.exampleDescription}>PNG</Text>
      ) : null}
      {typeof imagePng === 'string' ? (
        <Image
          testID="overlayImagePngResult"
          {...ImageResultProps}
          source={{ uri: imagePng }}
        />
      ) : null}
    </>
  );
});
