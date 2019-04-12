import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import ExampleOverlayImage from "./ExampleOverlayImage"
import ExamplePrintText from "./ExamplePrintText"

export interface Example {
  id: string
  title: string
  description: string
  render: () => React.ReactNode
}

export const IMAGE = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg?dl&fit=crop&crop=entropy&w=800&h="
export const OVERLAY = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png"

const EXAMPLES: Example[] = [
  {
    id: "originalImage",
    title: "Source Image",
    description: "Original Source Image size 1120 * 800",
    render: () => <Image style={styles.image} source={{ uri: IMAGE}} />
  },
  {
    id: "overlayImage",
    title: "Overlay Image",
    description: "Overlay Image size 200 * 141",
    render: () => <Image style={{ width: "100%", height: 141, paddingHorizontal: 20 }} resizeMode="center" source={{ uri: OVERLAY}} />
  },
  {
    id: "exampleOverlayImage",
    title: "overlayImage()",
    description: "Overlay image to background image at 30, 65",
    render: () => <ExampleOverlayImage />
  },
  {
    id: "examplePrintText",
    title: "printText()",
    description: "Print text into image",
    render: () => <ExamplePrintText />
  },
]

export default EXAMPLES