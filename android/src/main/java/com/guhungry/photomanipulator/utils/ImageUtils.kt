package com.guhungry.photomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import com.guhungry.photomanipulator.BitmapUtils
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