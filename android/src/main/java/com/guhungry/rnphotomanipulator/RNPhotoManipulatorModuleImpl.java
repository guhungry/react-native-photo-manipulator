
package com.guhungry.rnphotomanipulator;

import android.graphics.Bitmap;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.Typeface;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.text.ReactFontManager;
import com.guhungry.photomanipulator.BitmapUtils;
import com.guhungry.photomanipulator.MimeUtils;
import com.guhungry.photomanipulator.model.TextStyle;
import com.guhungry.rnphotomanipulator.utils.ImageUtils;
import com.guhungry.rnphotomanipulator.utils.ParamUtils;

public class RNPhotoManipulatorModuleImpl {
    public static final String NAME = "RNPhotoManipulator";
    private final String FILE_PREFIX = "RNPM_";
    private final int DEFAULT_QUALITY = 100;
    private final ReactApplicationContext reactContext;

    public RNPhotoManipulatorModuleImpl(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }


    public void batch(String uri, ReadableArray operations, ReadableMap cropRegion, @Nullable ReadableMap targetSize, Double quality, String mimeType, Promise promise) {
        try {
            Bitmap output = ImageUtils.cropBitmapFromUri(reactContext, uri, ParamUtils.rectFromMap(cropRegion), ParamUtils.sizeFromMap(targetSize));

            // Operations
            for (int i = 0, count = operations.size(); i < count; i++) {
                output = processBatchOperation(output, operations.getMap(i));
            }

            // Save & Optimize
            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, quality != null ? quality.intValue() : DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private Bitmap processBatchOperation(Bitmap image, ReadableMap operation) {
        if (operation == null) return image;
        String type = operation.getString("operation");
        if ("text".equals(type)) {
            ReadableMap text = operation.getMap("options");
            if (text == null) return image;

            printLine(image, text.getString("text"), (float) text.getDouble("textSize"), text.getString("fontName"), ParamUtils.pointfFromMap(text.getMap("position")), ParamUtils.colorFromMap(text.getMap("color")), text.getInt("thickness"), text.getInt("rotation"));
            return image;
        } else if ("overlay".equals(type)) {
            String uri = operation.getString("overlay");
            if (uri == null) return image;

            Bitmap overlay = ImageUtils.bitmapFromUri(reactContext, operation.getString("overlay"));
            BitmapUtils.overlay(image, overlay, ParamUtils.pointfFromMap(operation.getMap("position")));
            return image;
        } else if ("flip".equals(type)) {
            return BitmapUtils.flip(image, ParamUtils.flipModeFromString(operation.getString("mode")));
        } else if ("rotate".equals(type)) {
            return BitmapUtils.rotate(image, ParamUtils.rotationModeFromString(operation.getString("mode")));
        }
        return image;
    }

    public void crop(String uri, ReadableMap cropRegion, @Nullable ReadableMap targetSize, String mimeType, Promise promise) {
        try {
            Bitmap output = ImageUtils.cropBitmapFromUri(reactContext, uri, ParamUtils.rectFromMap(cropRegion), ParamUtils.sizeFromMap(targetSize));

            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void flipImage(String uri, String mode, String mimeType, Promise promise) {
        try {
            Bitmap input = ImageUtils.bitmapFromUri(reactContext, uri, ImageUtils.mutableOptions());

            Bitmap output = BitmapUtils.flip(input, ParamUtils.flipModeFromString(mode));
            input.recycle();

            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void rotateImage(String uri, String mode, String mimeType, Promise promise) {
        try {
            Bitmap input = ImageUtils.bitmapFromUri(reactContext, uri, ImageUtils.mutableOptions());

            Bitmap output = BitmapUtils.rotate(input, ParamUtils.rotationModeFromString(mode));
            input.recycle();

            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void overlayImage(String uri, String icon, ReadableMap position, String mimeType, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(reactContext, uri, ImageUtils.mutableOptions());
            Bitmap overlay = ImageUtils.bitmapFromUri(reactContext, icon);

            BitmapUtils.overlay(output, overlay, ParamUtils.pointfFromMap(position));
            overlay.recycle();

            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void printText(String uri, ReadableArray list, String mimeType, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(reactContext, uri, ImageUtils.mutableOptions());

            for (int i = 0, count = list.size(); i < count; i++) {
                ReadableMap text = list.getMap(i);
                printLine(output, text.getString("text"), (float) text.getDouble("textSize"), text.getString("fontName"), ParamUtils.pointfFromMap(text.getMap("position")), ParamUtils.colorFromMap(text.getMap("color")), text.getInt("thickness"), text.getInt("rotation"));
            }

            String file = ImageUtils.saveTempFile(reactContext, output, mimeType, FILE_PREFIX, DEFAULT_QUALITY);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void printLine(Bitmap image, String text, float scale, String fontName, PointF location, int color, float thickness, float rotation) {
        Typeface font = getFont(fontName);
        TextStyle style = new TextStyle(color, scale, font, Paint.Align.LEFT, thickness, rotation, 0, 0, 0, null);
        BitmapUtils.printText(image, text, location, style);
    }

    private Typeface getFont(String fontName) {
        if (fontName == null) return Typeface.DEFAULT;
        try {
            return ReactFontManager.getInstance().getTypeface(fontName, Typeface.NORMAL, reactContext.getAssets());
        } catch (Exception e) {
            return Typeface.DEFAULT;
        }
    }

    public void optimize(String uri, double quality, Promise promise) {
        try {
            Bitmap output = ImageUtils.bitmapFromUri(reactContext, uri);

            String file = ImageUtils.saveTempFile(reactContext, output, MimeUtils.JPEG, FILE_PREFIX, (int) quality);
            output.recycle();

            promise.resolve(file);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
