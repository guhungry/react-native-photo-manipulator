import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import PhotoManipulator from "../../../src/PhotoManipulator"
import { IMAGE, OVERLAY } from "./index"
import { noop } from "../utils"

export default React.memo(function ExampleOverlayImage() {
  const [image, setImage] = React.useState<string|null>(null)

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.overlayImage(IMAGE, OVERLAY, { x: 30, y: 65 }))
    }

    operation().then(noop).catch(console.log);
  }, [])

  return image && <Image style={styles.image} source={{ uri: image}} /> || null
})