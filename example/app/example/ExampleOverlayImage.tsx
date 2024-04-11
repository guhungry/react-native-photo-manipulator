import * as React from "react"
import {Image, Text} from "react-native"
import styles from "../App.styles"
import PhotoManipulator, {MimeType} from "react-native-photo-manipulator"
import {noop} from "../utils"
import {IMAGE, OVERLAY} from "./settings"

export default React.memo(function ExampleOverlayImage() {
  const [image, setImage] = React.useState<string|null>(null);
  const [imagePng, setImagePng] = React.useState<string|null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.overlayImage(IMAGE, OVERLAY, { x: 30, y: 65 }))
      setImagePng(await PhotoManipulator.overlayImage(IMAGE, OVERLAY, { x: 30, y: 65 }, MimeType.PNG))
    };

    operation().then(noop).catch(console.log);
  }, []);

  return <>
    { typeof image === "string" ? <Text style={styles.exampleDescription}>JPEG</Text> : null }
    { typeof image === "string" ? <Image testID="overlayImageResult" style={styles.image} source={{ uri: image}} /> : null }
    { typeof imagePng === "string" ? <Text style={styles.exampleDescription}>PNG</Text> : null }
    { typeof imagePng === "string" ? <Image testID="overlayImagePngResult" style={styles.image} source={{ uri: imagePng}} /> : null }
    </>
})
