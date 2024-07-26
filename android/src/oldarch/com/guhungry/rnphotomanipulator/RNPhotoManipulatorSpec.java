package com.guhungry.rnphotomanipulator;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public abstract class RNPhotoManipulatorSpec extends ReactContextBaseJavaModule {
    public RNPhotoManipulatorSpec(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public abstract void batch(String uri, ReadableArray operations, ReadableMap cropRegion, @Nullable ReadableMap targetSize, @Nullable Double quality, @Nullable String mimeType, Promise promise);
    public abstract void crop(String uri, ReadableMap cropRegion, @Nullable ReadableMap targetSize, @Nullable String mimeType, Promise promise);
    public abstract void flipImage(String uri, String mode, @Nullable String mimeType, Promise promise);
    public abstract void rotateImage(String uri, String mode, @Nullable String mimeType, Promise promise);
    public abstract void overlayImage(String uri, String icon, ReadableMap position, @Nullable String mimeType, Promise promise);
    public abstract void printText(String uri, ReadableArray list, @Nullable String mimeType, Promise promise);
    public abstract void optimize(String uri, double quality, Promise promise);
}
