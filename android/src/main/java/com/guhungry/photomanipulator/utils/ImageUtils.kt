package com.guhungry.photomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Point
import com.guhungry.photomanipulator.BitmapUtils
import com.guhungry.photomanipulator.CGRect
import com.guhungry.photomanipulator.CGSize
import com.guhungry.photomanipulator.FileUtils

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
}