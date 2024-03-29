import * as React from "react"
import { Image } from "react-native"
import styles from "../App.styles"
import ExampleOverlayImage from "./ExampleOverlayImage"
import ExamplePrintText from "./ExamplePrintText"
import { IMAGE, OVERLAY } from "./settings"
import ExampleCrop from "./ExampleCrop"
import ExampleOptimize from "./ExampleOptimize"
import ExampleBatch from "./ExampleBatch"
import ExampleFlip from "./ExampleFlip"

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
    render: () => <Image style={styles.image} resizeMode="center" source={{ uri: OVERLAY}} />
  },
  {
    id: "exampleFlip",
    title: "flipImage()",
    description: "Flip image horizontally of vertically",
    render: () => <ExampleFlip />
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
  {
    id: "exampleBatch",
    title: "batch()",
    description: "Do everything in one operation",
    render: () => <ExampleBatch />
  },
]

export default EXAMPLES