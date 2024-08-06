import * as React from 'react';
import { Image, Text } from 'react-native';
import styles, { ImageResultProps } from '../App.styles';
import { noop } from '../utils';
import PhotoManipulator, {
  RotationMode,
  MimeType,
} from 'react-native-photo-manipulator';
import { IMAGE } from './settings';

export default React.memo(function ExampleRotate() {
  const [image90, setImage90] = React.useState<string | null>(null);
  const [image180, setImage180] = React.useState<string | null>(null);
  const [image270, setImage270] = React.useState<string | null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage90(
        await PhotoManipulator.rotateImage(
          IMAGE,
          RotationMode.R90,
          MimeType.PNG
        )
      );
      setImage180(await PhotoManipulator.rotateImage(IMAGE, RotationMode.R180));
      setImage270(await PhotoManipulator.rotateImage(IMAGE, RotationMode.R270));
    };

    operation().then(noop).catch(console.log);
  }, []);

  return (
    <>
      {typeof image90 === 'string' ? (
        <Text style={styles.exampleDescription}>90°</Text>
      ) : null}
      {typeof image90 === 'string' ? (
        <Image
          testID="rotate90Result"
          {...ImageResultProps}
          source={{ uri: image90 }}
        />
      ) : null}
      {typeof image180 === 'string' ? (
        <Text style={styles.exampleDescription}>180°</Text>
      ) : null}
      {typeof image180 === 'string' ? (
        <Image
          testID="rotate180Result"
          {...ImageResultProps}
          source={{ uri: image180 }}
        />
      ) : null}
      {typeof image270 === 'string' ? (
        <Text style={styles.exampleDescription}>270°</Text>
      ) : null}
      {typeof image270 === 'string' ? (
        <Image
          testID="rotate270Result"
          {...ImageResultProps}
          source={{ uri: image270 }}
        />
      ) : null}
    </>
  );
});
