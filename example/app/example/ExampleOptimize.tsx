import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import PhotoManipulator from "../../../src/PhotoManipulator"
import { noop } from "../utils"
import { IMAGE } from "./settings"

export default React.memo(function ExampleOptimize() {
  const [image, setImage] = React.useState<string|null>(null)

  React.useEffect(() => {
    const operation = async () => {
      setImage(await PhotoManipulator.optimize(IMAGE, 5))
    }

    operation().then(noop).catch(console.log);
  }, [])

  return image && <Image testID="optimizeResult" style={styles.image} source={{ uri: image}} /> || null
})