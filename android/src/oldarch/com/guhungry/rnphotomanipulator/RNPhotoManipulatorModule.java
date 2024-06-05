package com.guhungry.rnphotomanipulator;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class RNPhotoManipulatorModule extends ReactContextBaseJavaModule {
    private final RNPhotoManipulatorModuleImpl implement;

    public RNPhotoManipulatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        implement = new RNPhotoManipulatorModuleImpl(reactContext);
    }

    @Override
    public String getName() {
        return RNPhotoManipulatorModuleImpl.NAME;
    }

    @ReactMethod
    public void batch(String uri, ReadableArray operations, ReadableMap cropRegion, @Nullable ReadableMap targetSize, Double quality, String mimeType, Promise promise) {
        implement.batch(uri, operations, cropRegion, targetSize, quality, mimeType, promise);
    }

    @ReactMethod
    public void crop(String uri, ReadableMap cropRegion, @Nullable ReadableMap targetSize, String mimeType, Promise promise) {
        implement.crop(uri, cropRegion, targetSize, mimeType, promise);
    }

    @ReactMethod
    public void flipImage(String uri, String mode, String mimeType, Promise promise) {
        implement.flipImage(uri, mode, mimeType, promise);
    }

    @ReactMethod
    public void rotateImage(String uri, String mode, String mimeType, Promise promise) {
        implement.rotateImage(uri, mode, mimeType, promise);
    }

    @ReactMethod
    public void overlayImage(String uri, String icon, ReadableMap position, String mimeType, Promise promise) {
        implement.overlayImage(uri, icon, position, mimeType, promise);
    }

    @ReactMethod
    public void printText(String uri, ReadableArray list, String mimeType, Promise promise) {
        implement.printText(uri, list, mimeType, promise);
    }

    @ReactMethod
    public void optimize(String uri, double quality, Promise promise) {
        implement.optimize(uri, quality, promise);
    }
}
