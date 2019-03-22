package com.guhungry.photomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import com.guhungry.photomanipulator.FileUtils

object ImageUtils {
    @JvmStatic fun bitmapFromUri(context: Context, uri: String): Bitmap {
        FileUtils.openBitmapInputStream(context, uri).use {
            return BitmapFactory.decodeStream(it)
        }
    }
}