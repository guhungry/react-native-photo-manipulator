import { NativeModules } from "react-native";
import "jest-extended"
import PhotoManipulator from "../PhotoManipulator"
import { toImageNative } from "../ParamUtils"

describe("Photo Manipulator", () => {
    describe("optimize()", () => {
        const imageUrl = "https://image.freepik.com/free-photo/tulips-bouquet-pink-background-with-copyspace_24972-271.jpg"
        const imageRequire = require.resolve("../../docs/test.png")
        const quality = 60

        test("with network source", () => {
            PhotoManipulator.optimize(imageUrl, quality)
            expect(NativeModules.RNPhotoManipulator.optimize).toBeCalledWith(imageUrl, quality);
        })

        test("with require source", () => {
            PhotoManipulator.optimize(imageRequire, quality)
            expect(NativeModules.RNPhotoManipulator.optimize).toBeCalledWith(toImageNative(imageRequire), quality);
        })
    });
});