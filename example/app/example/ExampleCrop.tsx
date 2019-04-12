import * as React from "react"
import { Image, Text } from "react-native"
import styles from "../App.styles"
import { noop } from "../utils"
import PhotoManipulator from "../../../src/PhotoManipulator"
import { IMAGE } from "./settings"

export default React.memo(function ExampleCrop() {
  const [crop, setCrop] = React.useState<string|null>(null)
  const [resize, setResize] = React.useState<string|null>(null)

  React.useEffect(() => {
    const operation = async () => {
      setCrop(await PhotoManipulator.crop(IMAGE, { x: 400, y: 200, width: 300, height: 200 }))
      setResize(await PhotoManipulator.crop(IMAGE, { x: 400, y: 200, width: 300, height: 200 }, { width: 60, height: 40 }))
    }

    operation().then(noop).catch(console.log);
  }, [])

  return (
    <>
      { typeof crop === "string" ? <Text style={styles.exampleDescription}>Crop</Text> : null }
      { typeof crop === "string" ? <Image style={styles.image} source={{ uri: crop}} /> : null }
      { typeof resize === "string" ? <Text style={styles.exampleDescription}>Crop & Resize</Text> : null }
      { typeof resize === "string" ? <Image style={styles.image} source={{ uri: resize}} /> : null }
    </>
  )
})