import { NativeModules } from "react-native";
import "jest-extended"
import PhotoManipulator from "../PhotoManipulator"
import { toImageNative } from "../ParamUtils"

describe("Photo Manipulator", () => {
    describe("overlayImage()", () => {
        const imageUrl = "https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg"
        const imageRequire = require.resolve("../../docs/test.png")
        const position = { x: 30, y: 20 }

        test("with network source", () => {
            PhotoManipulator.overlayImage(imageUrl, imageUrl, position)
            expect(NativeModules.RNPhotoManipulator.overlayImage).toBeCalledWith(imageUrl, imageUrl, position);
        })

        test("with require source", () => {
            PhotoManipulator.overlayImage(imageRequire, imageRequire, position)
            expect(NativeModules.RNPhotoManipulator.overlayImage).toBeCalledWith(toImageNative(imageRequire), toImageNative(imageRequire), position);
        })
    });
});