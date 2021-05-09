import * as React from "react"
import {Image, Text} from "react-native"
import styles from "../App.styles"
import {noop} from "../utils"
import PhotoManipulator, {PhotoBatchOperations} from "react-native-photo-manipulator"
import {IMAGE, OVERLAY} from "./settings"
import {MimeType} from "react-native-photo-manipulator/lib/PhotoManipulatorTypes";

export default React.memo(function ExampleBatch() {
  const [image, setImage] = React.useState<string|null>(null);
  const [imagePng, setImagePng] = React.useState<string|null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.batch(IMAGE, operations(), { x: 40, y: 5, width: 600, height: 400 }, { width: 300, height: 200 }, 30))
      setImagePng(await PhotoManipulator.batch(IMAGE, operations(), { x: 40, y: 5, width: 600, height: 400 }, undefined, undefined, MimeType.PNG))
    };

    operation().then(noop).catch(console.log);
  }, []);

  return <>
      { typeof image === "string" ? <Text style={styles.exampleDescription}>Crop & Resize</Text> : null }
      { typeof image === "string" ? <Image testID="batchResult" style={styles.image} source={{ uri: image}} /> : null }
      { typeof imagePng === "string" ? <Text style={styles.exampleDescription}>Crop Only</Text> : null }
      { typeof imagePng === "string" ? <Image testID="batchResultPng" style={styles.image} source={{ uri: imagePng}} /> : null }
    </>

  function operations(): PhotoBatchOperations[] {
    return [
      { operation: "text", options: { text: "Test Print Text", color: "black", textSize: 30, position: { x: 80, y: 30 }, thickness: 4 } },
      { operation: "text", options: { text: "Test Print Text", color: "white", textSize: 30, position: { x: 80, y: 30 } } },
      { operation: "overlay", overlay: OVERLAY, position: { x: 110, y: 25 } },
      { operation: "text", options: { text: "Test Print Text 2", color: "blue", textSize: 30, position: { x: 100, y: 80 }, thickness: 4 } },
      { operation: "text", options: { text: "Test Print Text 2", color: "brown", textSize: 30, position: { x: 100, y: 80 } } },
      { operation: "text", options: { text: "Test Print Text 3", color: "green", textSize: 30, position: { x: 180, y: 180 } } },
      { operation: "overlay", overlay: OVERLAY, position: { x: 15, y: 65 } },
    ]
  }
})
