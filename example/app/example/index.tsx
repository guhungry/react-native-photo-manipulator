import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import ExampleOverlayImage from "./ExampleOverlayImage"
import ExamplePrintText from "./ExamplePrintText"
import { IMAGE, OVERLAY } from "./settings"
import ExampleCrop from "./ExampleCrop"
import ExampleOptimize from "./ExampleOptimize"

export interface Example {
  id: string
  title: string
  description: string
  render: () => React.ReactNode
}

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
  {
    id: "exampleCrop",
    title: "crop()",
    description: "Crop Image & Resize if specified targetSize",
    render: () => <ExampleCrop />
  },
  {
    id: "exampleOptimize",
    title: "optimize()",
    description: "Reduce image quality",
    render: () => <ExampleOptimize />
  },
]

export default EXAMPLES