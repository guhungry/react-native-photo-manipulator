import { NativeModules } from "react-native";

describe("Photo Manipulator", () => {
    test("Native Module Mock", () => {
        expect(NativeModules.RNPhotoManipulator).toBeObject();
    });
});