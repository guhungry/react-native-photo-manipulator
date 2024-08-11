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
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toColorInt
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toFlipMode
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toPointF
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toCGRect
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toRotationMode
import com.guhungry.rnphotomanipulator.utils.ParamUtils.toCGSize

class RNPhotoManipulatorModule(private val context: ReactApplicationContext) : RNPhotoManipulatorSpec(context) {
    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun batch(uri: String, operations: ReadableArray, cropRegion: ReadableMap, targetSize: ReadableMap?, quality: Double?, mimeType: String?, promise: Promise) {
        try {
            var output = cropBitmapFromUri(context, uri, toCGRect(cropRegion), toCGSize(targetSize))

            // Operations
            for (i in 0 until operations.size()) {
                output = processBatchOperation(output, operations.getMap(i))
            }

            // Save & Optimize
            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, quality!!.toInt())
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
                    toPointF(text.getMap("position"))!!,
                    text
                )
                return image
            }

            "overlay" -> {
                val uri = operation.getString("overlay") ?: return image

                val overlay = bitmapFromUri(context, uri)
                overlay(image, overlay, toPointF(operation.getMap("position"))!!)
                return image
            }

            "flip" -> {
                return flip(image, toFlipMode(operation.getString("mode")!!))
            }

            "rotate" -> {
                return rotate(image, toRotationMode(operation.getString("mode")!!))
            }

            else -> return image
        }
    }

    @ReactMethod
    override fun crop(uri: String, cropRegion: ReadableMap, targetSize: ReadableMap?, mimeType: String?, promise: Promise) {
        try {
            val output = cropBitmapFromUri(context, uri, toCGRect(cropRegion), toCGSize(targetSize))

            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun flipImage(uri: String, mode: String, mimeType: String?, promise: Promise) {
        try {
            val input = bitmapFromUri(context, uri, mutableOptions())

            val output = flip(input, toFlipMode(mode))
            input.recycle()

            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun rotateImage(uri: String, mode: String, mimeType: String?, promise: Promise) {
        try {
            val input = bitmapFromUri(context, uri, mutableOptions())

            val output = rotate(input, toRotationMode(mode))
            input.recycle()

            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun overlayImage(uri: String, icon: String, position: ReadableMap, mimeType: String?, promise: Promise) {
        try {
            val output = bitmapFromUri(context, uri, mutableOptions())
            val overlay = bitmapFromUri(context, icon)

            overlay(output, overlay, toPointF(position)!!)
            overlay.recycle()

            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun printText(uri: String, list: ReadableArray, mimeType: String?, promise: Promise) {
        try {
            val output = bitmapFromUri(context, uri, mutableOptions())

            for (i in 0 until list.size()) {
                val text = list.getMap(i)
                printLine(output, text.getString("text")!!, toPointF(text.getMap("position"))!!, text)
            }

            val file = saveTempFile(context, output, mimeType!!, FILE_PREFIX, DEFAULT_QUALITY)
            output.recycle()

            promise.resolve(file)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    private fun printLine(image: Bitmap, text: String, location: PointF, options: ReadableMap) {
        val shadowOffset = toPointF(options.getMap("shadowOffset"))
        val style = TextStyle(
            toColorInt(options.getMap("color"))!!,
            options.getDouble("textSize").toFloat(),
            getFont(options.getString("fontName")),
            Paint.Align.LEFT,
            options.getInt("thickness").toFloat(),
            options.getDouble("rotation").toFloat(),
            options.getDouble("shadowRadius").toFloat(),
            shadowOffset?.x ?: 0f,
            shadowOffset?.y ?: 0f,
            toColorInt(options.getMap("shadowColor"))
        )
        printText(image, text, location, style)
    }

    private fun getFont(fontName: String?): Typeface {
        if (fontName == null) return Typeface.DEFAULT
        return try {
            ReactFontManager.getInstance()
                .getTypeface(fontName, Typeface.NORMAL, context.assets)
        } catch (e: Exception) {
            Typeface.DEFAULT
        }
    }

    @ReactMethod
    override fun optimize(uri: String, quality: Double, promise: Promise) {
        try {
            val output = bitmapFromUri(context, uri)

            val file = saveTempFile(context, output, MimeUtils.JPEG, FILE_PREFIX, quality.toInt())
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
