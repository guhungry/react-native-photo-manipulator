import * as React from "react"
import { Image, Text } from "react-native"
import styles, { ImageResultProps } from "../App.styles"
import { noop } from "../utils"
import PhotoManipulator from "react-native-photo-manipulator"
import { IMAGE } from "./settings"

export default React.memo(function ExampleCrop() {
  const [crop, setCrop] = React.useState<string|null>(null);
  const [resize, setResize] = React.useState<string|null>(null);
  const [cropPng, setCropPng] = React.useState<string|null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setCrop(await PhotoManipulator.crop(IMAGE, { x: 400, y: 200, width: 300, height: 200 }));
      setResize(await PhotoManipulator.crop(IMAGE, { x: 400, y: 200, width: 300, height: 200 }, { width: 60, height: 40 }))
      setCropPng(await PhotoManipulator.crop(IMAGE, { x: 400, y: 200, width: 300, height: 200 }));
    };

    operation().then(noop).catch(console.log);
  }, []);

  return (
    <>
      { typeof crop === "string" ? <Text style={styles.exampleDescription}>Crop</Text> : null }
      { typeof crop === "string" ? <Image testID="cropResult" {...ImageResultProps} source={{ uri: crop}} /> : null }
      { typeof resize === "string" ? <Text style={styles.exampleDescription}>Crop & Resize</Text> : null }
      { typeof resize === "string" ? <Image testID="cropResizeResult" {...ImageResultProps} source={{ uri: resize}} /> : null }
      { typeof cropPng === "string" ? <Text style={styles.exampleDescription}>PNG</Text> : null }
      { typeof cropPng === "string" ? <Image testID="cropPngResult" {...ImageResultProps} source={{ uri: cropPng}} /> : null }
    </>
  )
})
