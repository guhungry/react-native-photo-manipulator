import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import { noop } from "../utils"
import PhotoManipulator from "../../../src/PhotoManipulator"
import { TextOptions } from "../../../src/PhotoManipulatorTypes"
import { IMAGE } from "./settings"

export default React.memo(function ExamplePrintText() {
  const [image, setImage] = React.useState<string|null>(null);

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.printText(IMAGE, texts()))
    };

    operation().then(noop).catch(console.log);
  }, []);

  return image && <Image testID="printTextResult" style={styles.image} source={{ uri: image}} /> || null;

  function texts(): TextOptions[] {
    return [
      { text: "Test Print Text", color: "black", textSize: 30, position: { x: 80, y: 30 }, thickness: 4 },
      { text: "Test Print Text", color: "white", textSize: 30, position: { x: 80, y: 30 } },
      { text: "Test Print Text 2", color: "blue", textSize: 30, position: { x: 100, y: 80 }, thickness: 4 },
      { text: "Test Print Text 2", color: "brown", textSize: 30, position: { x: 100, y: 80 } },
      { text: "Test Print Text 3", color: "green", textSize: 30, position: { x: 180, y: 180 } },
    ]
  }
})