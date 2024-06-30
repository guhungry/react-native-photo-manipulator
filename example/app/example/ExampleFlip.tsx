import * as React from 'react';
import {Image, Text} from 'react-native';
import styles, {ImageResultProps} from '../App.styles';
import {noop} from '../utils';
import PhotoManipulator, {
  FlipMode,
  MimeType,
} from 'react-native-photo-manipulator';
import {IMAGE} from './settings';

export default React.memo(function ExampleFlip() {
  const [imageBoth, setImageBoth] = React.useState<string | null>(null);
  const [imageHorizontal, setImageHorizontal] = React.useState<string | null>(
    null,
  );
  const [imageVertical, setImageVertical] = React.useState<string | null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImageBoth(
        await PhotoManipulator.flipImage(IMAGE, FlipMode.Both, MimeType.PNG),
      );
      setImageHorizontal(
        await PhotoManipulator.flipImage(IMAGE, FlipMode.Horizontal),
      );
      setImageVertical(
        await PhotoManipulator.flipImage(IMAGE, FlipMode.Vertical),
      );
    };

    operation().then(noop).catch(console.log);
  }, []);

  return (
    <>
      {typeof imageHorizontal === 'string' ? (
        <Text style={styles.exampleDescription}>Horizontal</Text>
      ) : null}
      {typeof imageHorizontal === 'string' ? (
        <Image
          testID="flipHorizontalResult"
          {...ImageResultProps}
          source={{uri: imageHorizontal}}
        />
      ) : null}
      {typeof imageVertical === 'string' ? (
        <Text style={styles.exampleDescription}>Vertical</Text>
      ) : null}
      {typeof imageVertical === 'string' ? (
        <Image
          testID="flipVerticalResult"
          {...ImageResultProps}
          source={{uri: imageVertical}}
        />
      ) : null}
      {typeof imageBoth === 'string' ? (
        <Text style={styles.exampleDescription}>Both</Text>
      ) : null}
      {typeof imageBoth === 'string' ? (
        <Image
          testID="flipBothResult"
          {...ImageResultProps}
          source={{uri: imageBoth}}
        />
      ) : null}
    </>
  );
});
