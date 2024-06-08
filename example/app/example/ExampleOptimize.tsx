import * as React from "react"
import { Image } from "react-native"
import { ImageResultProps } from "../App.styles"
import PhotoManipulator from "react-native-photo-manipulator"
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

  return image && <Image testID="optimizeResult" {...ImageResultProps} resizeMode="contain" source={{ uri: image}} /> || null
})
