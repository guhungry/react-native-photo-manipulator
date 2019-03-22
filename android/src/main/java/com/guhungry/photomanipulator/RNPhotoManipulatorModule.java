
package com.guhungry.photomanipulator;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.PointF;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.guhungry.photomanipulator.utils.ImageUtils;
import com.guhungry.photomanipulator.utils.ParamUtils;

public class RNPhotoManipulatorModule extends ReactContextBaseJavaModule {
    private final String FILE_PREFIX = "RNPM_";
    private final int DEFAULT_QUALITY = 90;

    public RNPhotoManipulatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNPhotoManipulator";
    }

    @ReactMethod
    public void batch(String uri, ReadableMap size, int quality, ReadableArray operations, Promise promise) {
        try {
            Bitmap output = ImageUtils.resizedBitmapFromUri(getReactApplicationContext(), uri, ParamUtils.sizeFromMap(size));

            // Operations
            for (int i = 0, count = operations.size(); i < count; i++) {
                processBatchOperation(output, operations.getMap(i));
            }

            // Save & Optimize
            String file = ImageUtils.saveTempFile(getReactApplicationContext(), output, MimeUtils.JPEG, FILE_PREFIX, quality);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void processBatchOperation(Bitmap image, ReadableMap operation) {
        if (operation == null) return;
        String type = operation.getString("operation");
        if ("text".equals(type)) {
            ReadableMap text = operation.getMap("options");
            if (text == null) return;

            printLine(image, text.getString("text"), (float) text.getDouble("textSize"), ParamUtils.pointfFromMap(text.getMap("location")), ParamUtils.colorFromMap(text.getMap("color")), text.getInt("thickness"));
        } else if ("overlay".equals(type)) {
            String uri = operation.getString("overlay");
            if (uri == null) return;

            Bitmap overlay = ImageUtils.bitmapFromUri(getReactApplicationContext(), operation.getString("overlay"));
            BitmapUtils.overlay(image, overlay, ParamUtils.pointfFromMap(operation.getMap("position")));
        }
    }

    @ReactMethod
    public void overlayImage(String uri, String icon, ReadableMap position, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);
            Bitmap overlay = ImageUtils.bitmapFromUri(getReactApplicationContext(), icon);

            BitmapUtils.overlay(output, overlay, ParamUtils.pointfFromMap(position));
            overlay.recycle();

            String file = ImageUtils.saveTempFile(getReactApplicationContext(), output, MimeUtils.JPEG, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void printText(String uri, ReadableArray list, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);

            for (int i = 0, count = list.size(); i < count; i++) {
                ReadableMap text = list.getMap(i);
                if (text == null) continue;
                printLine(output, text.getString("text"), (float) text.getDouble("size"), ParamUtils.pointfFromMap(text.getMap("location")), ParamUtils.colorFromMap(text.getMap("color")), text.getInt("thickness"));
            }

            String file = ImageUtils.saveTempFile(getReactApplicationContext(), output, MimeUtils.JPEG, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void printLine(Bitmap image, String text, float scale, PointF location, int color, int thickness) {
        BitmapUtils.printText(image, text, location, color, scale, Paint.Align.LEFT, thickness);
    }

    @ReactMethod
    public void optimize(String uri, int quality, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);

            String file = ImageUtils.saveTempFile(getReactApplicationContext(), output, MimeUtils.JPEG, FILE_PREFIX, quality);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void resize(String uri, ReadableMap targetSize, Promise promise) {
        try {
            Bitmap output = ImageUtils.resizedBitmapFromUri(getReactApplicationContext(), uri, ParamUtils.sizeFromMap(targetSize));

            String file = ImageUtils.saveTempFile(getReactApplicationContext(), output, MimeUtils.JPEG, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
