import { Image } from "react-native";
import { Color, PhotoBatchOperations, TextOptions } from "./PhotoManipulatorTypes";
// @ts-ignore
import parse from "parse-color";

/**
 * Parameter Utilities Class
 */
export class ParamUtils {
    static toBatchNative = (it: PhotoBatchOperations) => {
        if (it.operation === "text") return { ...it, options: ParamUtils.toTextOptionsNative(it.options) }
        if (it.operation === "overlay") return { ...it, overlay: typeof it.overlay === "string" ? it : Image.resolveAssetSource(it.overlay).uri }
        return it
    }
    static toTextOptionsNative = (it: TextOptions) => ({ ...it, color: ParamUtils.toColorNative(it.color), thickness: it.thickness || 0 })
    static toColorNative = (color?: string): Color => {
        const result = parse(color || "#000000").rgba
        return {
            r: result[0],
            g: result[1],
            b: result[2],
            a: result[3] * 255,
        }
    }
}