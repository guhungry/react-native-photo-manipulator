
package com.guhungry.rnphotomanipulator;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public abstract class RNPhotoManipulatorSpec extends NativeRNPhotoManipulatorSpec {
    public RNPhotoManipulatorSpec(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
