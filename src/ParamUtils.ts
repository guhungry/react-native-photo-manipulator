import { Image } from "react-native";
// @ts-ignore
import parse from "parse-color";
import { Color, ImageSource, PhotoBatchOperations, TextOptions } from "./PhotoManipulatorTypes";

/**
 * Parameter Utilities Class
 */
export class ParamUtils {
    static toBatchNative = (it: PhotoBatchOperations) => {
        if (it.operation === "text") return { ...it, options: ParamUtils.toTextOptionsNative(it.options) };
        if (it.operation === "overlay") return { ...it, overlay: ParamUtils.toImageNative(it.overlay) };
        return it
    };

    static toTextOptionsNative = (it: TextOptions) => ({ ...it, color: ParamUtils.toColorNative(it.color), thickness: it.thickness || 0 });

    static toColorNative = (color?: string): Color => {
        const result = parse(color || "#000000").rgba;
        return {
            r: result[0],
            g: result[1],
            b: result[2],
            a: result[3] * 255,
        }
    };

    static toImageNative = (source: ImageSource) => {
        if (typeof source === "string") return source;

        const {uri} = Image.resolveAssetSource(source);
        if (uri.includes("://")) return uri;
        return `file:///android_res/${uri}`
    }
}