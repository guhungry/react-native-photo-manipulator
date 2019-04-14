import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import { noop } from "../utils"
import PhotoManipulator from "../../../src/PhotoManipulator"
import { PhotoBatchOperations } from "../../../src/PhotoManipulatorTypes"
import { IMAGE, OVERLAY } from "./settings"

export default React.memo(function ExampleBatch() {
  const [image, setImage] = React.useState<string|null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.batch(IMAGE, operations(), { x: 40, y: 5, width: 600, height: 400 }, { width: 300, height: 200 }, 30))
    };

    operation().then(noop).catch(console.log);
  }, []);

  return image && <Image testID="batchResult" style={styles.image} source={{ uri: image}} /> || null;

  function operations(): PhotoBatchOperations[] {
    return [
      { operation: "text", options: { text: "Test Print Text", color: "black", textSize: 30, position: { x: 80, y: 30 }, thickness: 4 } },
      { operation: "text", options: { text: "Test Print Text", color: "white", textSize: 30, position: { x: 80, y: 30 } } },
      { operation: "text", options: { text: "Test Print Text 2", color: "blue", textSize: 30, position: { x: 100, y: 80 }, thickness: 4 } },
      { operation: "text", options: { text: "Test Print Text 2", color: "brown", textSize: 30, position: { x: 100, y: 80 } } },
      { operation: "text", options: { text: "Test Print Text 3", color: "green", textSize: 30, position: { x: 180, y: 180 } } },
      { operation: "overlay", overlay: OVERLAY, position: { x: 30, y: 65 } },
    ]
  }
})