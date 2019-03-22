package com.guhungry.photomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Point
import android.net.Uri
import com.guhungry.photomanipulator.*

object ImageUtils {
    /**
     * Get Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun bitmapFromUri(context: Context, uri: String): Bitmap {
        FileUtils.openBitmapInputStream(context, uri).use {
            return BitmapFactory.decodeStream(it)
        }
    }

    /**
     * Get Resized Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun resizedBitmapFromUri(context: Context, uri: String, targetSize: CGSize): Bitmap {
        val originalSize = ImageUtils.dimensionFromUri(context, uri)

        return processResizedBitmap(context, uri, originalSize, targetSize)
    }

    private fun processResizedBitmap(context: Context, uri: String, originalSize: CGSize, targetSize: CGSize): Bitmap {
        FileUtils.openBitmapInputStream(context, uri).use {
            return BitmapUtils.cropAndResize(it, CGRect(Point(0, 0), originalSize), targetSize, BitmapFactory.Options());
        }
    }

    /**
     * Get Size of Image from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun dimensionFromUri(context: Context, uri: String): CGSize {
        FileUtils.openBitmapInputStream(context, uri).use {
            return BitmapUtils.readImageDimensions(it)
        }
    }

    /**
     * Save image to temp file
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun saveTempFile(context: Context, image: Bitmap, mimeType: String, prefix: String, quality: Int): String {
        val file = FileUtils.createTempFile(context, prefix, mimeType)
        FileUtils.saveImageFile(image, mimeType, quality, file)

        return Uri.fromFile(file).toString()
    }
}