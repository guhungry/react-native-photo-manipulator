
package com.guhungry.photomanipulator;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.PointF;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.guhungry.photomanipulator.utils.ImageUtils;
import com.guhungry.photomanipulator.utils.ParamUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

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
    public void batch(String uri, ReadableMap size, int quality, ReadableArray operations, Promise promise) throws IOException {
        InputStream stream = null;

        try {
            // Read Dimension
            CGSize originalSize = ImageUtils.dimensionFromUri(getReactApplicationContext(), uri);

            // Resize
            stream = FileUtils.openBitmapInputStream(getReactApplicationContext(), uri);
            Bitmap output = BitmapUtils.cropAndResize(stream, new CGRect(new android.graphics.Point(0, 0), originalSize), ParamUtils.sizeFromMap(size), new BitmapFactory.Options());
            stream.close();

            // Operations
            for (int i = 0, count = operations.size(); i < count; i++) {
                processBatchOperation(output, operations.getMap(i));
            }

            // Save & Optimize
            File file = FileUtils.createTempFile(getReactApplicationContext(), FILE_PREFIX, MimeUtils.JPEG);
            FileUtils.saveImageFile(output, MimeUtils.JPEG, quality, file);
            output.recycle();

            promise.resolve(Uri.fromFile(file).toString());
        } catch (Exception e) {
            if (stream != null) stream.close();
            promise.reject(e);
        }
    }

    private void processBatchOperation(Bitmap image, ReadableMap operation) throws IOException {
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
    public void overlayImage(String uri, String icon, ReadableMap position, Promise promise) throws IOException {
        try {
            // Read
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);
            Bitmap overlay = ImageUtils.bitmapFromUri(getReactApplicationContext(), icon);

            BitmapUtils.overlay(output, overlay, ParamUtils.pointfFromMap(position));
            overlay.recycle();

            // Save
            File file = FileUtils.createTempFile(getReactApplicationContext(), FILE_PREFIX, MimeUtils.JPEG);
            FileUtils.saveImageFile(output, MimeUtils.JPEG, DEFAULT_QUALITY, file);
            output.recycle();

            promise.resolve(Uri.fromFile(file).toString());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void printText(String uri, ReadableArray list, Promise promise) throws IOException {
        try {
            // Read
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);

            for (int i = 0, count = list.size(); i < count; i++) {
                ReadableMap text = list.getMap(i);
                if (text == null) continue;
                printLine(output, text.getString("text"), (float) text.getDouble("size"), ParamUtils.pointfFromMap(text.getMap("location")), ParamUtils.colorFromMap(text.getMap("color")), text.getInt("thickness"));
            }

            File file = FileUtils.createTempFile(getReactApplicationContext(), FILE_PREFIX, MimeUtils.JPEG);
            FileUtils.saveImageFile(output, MimeUtils.JPEG, DEFAULT_QUALITY, file);
            output.recycle();

            promise.resolve(Uri.fromFile(file).toString());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void printLine(Bitmap image, String text, float scale, PointF location, int color, int thickness) {
        BitmapUtils.printText(image, text, location, color, scale, Paint.Align.LEFT, thickness);
    }

    @ReactMethod
    public void optimize(String uri, int quality, Promise promise) throws IOException {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(getReactApplicationContext(), uri);

            // Save
            File file = FileUtils.createTempFile(getReactApplicationContext(), FILE_PREFIX, MimeUtils.JPEG);
            FileUtils.saveImageFile(output, MimeUtils.JPEG, quality, file);
            output.recycle();

            promise.resolve(Uri.fromFile(file).toString());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void resize(String uri, ReadableMap targetSize, Promise promise) throws IOException {
        InputStream stream = null;

        try {
            // Read Dimension
            CGSize originalSize = ImageUtils.dimensionFromUri(getReactApplicationContext(), uri);

            // Resize
            stream = FileUtils.openBitmapInputStream(getReactApplicationContext(), uri);
            Bitmap output = BitmapUtils.cropAndResize(stream, new CGRect(new android.graphics.Point(0, 0), originalSize), ParamUtils.sizeFromMap(targetSize), new BitmapFactory.Options());
            stream.close();

            // Save
            File file = FileUtils.createTempFile(getReactApplicationContext(), FILE_PREFIX, MimeUtils.JPEG);
            FileUtils.saveImageFile(output, MimeUtils.JPEG, DEFAULT_QUALITY, file);
            output.recycle();

            promise.resolve(Uri.fromFile(file).toString());
        } catch (Exception e) {
            if (stream != null) stream.close();
            promise.reject(e);
        }
    }
}
