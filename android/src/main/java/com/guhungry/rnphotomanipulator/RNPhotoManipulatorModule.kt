package com.guhungry.rnphotomanipulator

import android.graphics.Bitmap
import android.graphics.Paint
import android.graphics.PointF
import android.graphics.Typeface
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.text.ReactFontManager
import com.guhungry.photomanipulator.BitmapUtils.flip
import com.guhungry.photomanipulator.BitmapUtils.overlay
import com.guhungry.photomanipulator.BitmapUtils.printText
import com.guhungry.photomanipulator.BitmapUtils.rotate
import com.guhungry.photomanipulator.MimeUtils
import com.guhungry.photomanipulator.model.TextStyle
import com.guhungry.rnphotomanipulator.utils.ImageUtils.bitmapFromUri
import com.guhungry.rnphotomanipulator.utils.ImageUtils.cropBitmapFromUri
import com.guhungry.rnphotomanipulator.utils.ImageUtils.mutableOptions
import com.guhungry.rnphotomanipulator.utils.ImageUtils.saveTempFile
import com.guhungry.rnphotomanipulator.utils.ParamUtils.colorFromMap
import com.guhungry.rnphotomanipulator.utils.ParamUtils.flipModeFromString
import com.guhungry.rnphotomanipulator.utils.ParamUtils.pointfFromMap
import com.guhungry.rnphotomanipulator.utils.ParamUtils.rectFromMap
import com.guhungry.rnphotomanipulator.utils.ParamUtils.rotationModeFromString
import com.guhungry.rnphotomanipulator.utils.ParamUtils.sizeFromMap

class RNPhotoManipulatorModule(private val reactContext: ReactApplicationContext) : RNPhotoManipulatorSpec(reactContext) {
    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun batch(uri: String, operations: ReadableArray, cropRegion: ReadableMap, targetSize: ReadableMap?, quality: Double?, mimeType: String?, promise: Promise) {
        try {
            var output = cropBitmapFromUri(reactContext, uri, rectFromMap(cropRegion), sizeFromMap(targetSize))

            // Operations
            for (i in 0 until operations.size()) {
                output = processBatchOperation(output, operations.getMap(i))
            }

            // Save & Optimize
            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, quality!!.toInt())
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    private fun processBatchOperation(image: Bitmap, operation: ReadableMap?): Bitmap {
        if (operation == null) return image
        when (operation.getString("operation")) {
            "text" -> {
                val text = operation.getMap("options") ?: return image

                printLine(
                    image,
                    text.getString("text")!!,
                    pointfFromMap(text.getMap("position"))!!,
                    text
                )
                return image
            }

            "overlay" -> {
                val uri = operation.getString("overlay") ?: return image

                val overlay = bitmapFromUri(reactContext, uri)
                overlay(image, overlay, pointfFromMap(operation.getMap("position"))!!)
                return image
            }

            "flip" -> {
                return flip(image, flipModeFromString(operation.getString("mode")!!))
            }

            "rotate" -> {
                return rotate(image, rotationModeFromString(operation.getString("mode")!!))
            }

            else -> return image
        }
    }

    @ReactMethod
    override fun crop(uri: String, cropRegion: ReadableMap, targetSize: ReadableMap?, mimeType: String?, promise: Promise) {
        try {
            val output = cropBitmapFromUri(reactContext, uri, rectFromMap(cropRegion), sizeFromMap(targetSize))

            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun flipImage(uri: String, mode: String, mimeType: String?, promise: Promise) {
        try {
            val input = bitmapFromUri(reactContext, uri, mutableOptions())

            val output = flip(input, flipModeFromString(mode))
            input.recycle()

            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun rotateImage(uri: String, mode: String, mimeType: String?, promise: Promise) {
        try {
            val input = bitmapFromUri(reactContext, uri, mutableOptions())

            val output = rotate(input, rotationModeFromString(mode))
            input.recycle()

            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun overlayImage(uri: String, icon: String, position: ReadableMap, mimeType: String?, promise: Promise) {
        try {
            val output = bitmapFromUri(reactContext, uri, mutableOptions())
            val overlay = bitmapFromUri(reactContext, icon)

            overlay(output, overlay, pointfFromMap(position)!!)
            overlay.recycle()

            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun printText(uri: String, list: ReadableArray, mimeType: String?, promise: Promise) {
        try {
            val output = bitmapFromUri(reactContext, uri, mutableOptions())

            for (i in 0 until list.size()) {
                val text = list.getMap(i)
                printLine(output, text.getString("text")!!, pointfFromMap(text.getMap("position"))!!, text)
            }

            val file = saveTempFile(reactContext, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    private fun printLine(image: Bitmap, text: String, location: PointF, options: ReadableMap) {
        val shadowOffset = pointfFromMap(options.getMap("shadowOffset"))
        val style = TextStyle(
            colorFromMap(options.getMap("color"))!!,
            options.getDouble("textSize").toFloat(),
            getFont(options.getString("fontName")),
            Paint.Align.LEFT,
            options.getInt("thickness").toFloat(),
            options.getDouble("rotation").toFloat(),
            options.getDouble("shadowRadius").toFloat(),
            shadowOffset?.x ?: 0f,
            shadowOffset?.y ?: 0f,
            colorFromMap(options.getMap("shadowColor"))
        )
        printText(image, text, location, style)
    }

    private fun getFont(fontName: String?): Typeface {
        if (fontName == null) return Typeface.DEFAULT
        return try {
            ReactFontManager.getInstance()
                .getTypeface(fontName, Typeface.NORMAL, reactContext.assets)
        } catch (e: Exception) {
            Typeface.DEFAULT
        }
    }

    @ReactMethod
    override fun optimize(uri: String, quality: Double, promise: Promise) {
        try {
            val output = bitmapFromUri(reactContext, uri)

            val file = saveTempFile(reactContext, output, MimeUtils.JPEG, FILE_PREFIX, quality.toInt())
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    companion object {
        const val NAME: String = "RNPhotoManipulator"
        private const val FILE_PREFIX = "RNPM_"
        private const val DEFAULT_QUALITY = 100
    }
}
