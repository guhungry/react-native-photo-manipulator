package com.guhungry.rnphotomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Point
import android.net.Uri
import com.guhungry.photomanipulator.*
import java.io.InputStream

object ImageUtils {
    /**
     * Get Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmOverloads
    @JvmStatic fun bitmapFromUri(context: Context, uri: String, options: BitmapFactory.Options? = null): Bitmap {
        openBitmapInputStream(context, uri).use {
            return BitmapFactory.decodeStream(it, null, options)!!
        }
    }

    @JvmStatic fun mutableOptions() = BitmapFactory.Options().apply { inMutable = true }

    private fun openBitmapInputStream(context: Context, uri: String): InputStream = FileUtils.openBitmapInputStream(context, computeUri(context, uri))

    private fun computeUri(context: Context, uri: String): String {
        return if (Uri.parse(uri).scheme != null) uri else computeDrawableResourceUri(context, uri)
    }
    private fun computeDrawableResourceUri(context: Context, name: String) = "android.resource://${context.packageName}/${computeDrawableResourceId(context, name)}"
    private fun computeDrawableResourceId(context: Context, name: String): Int {
        if (name.isEmpty()) return 0

        // name could be a resource id.
        try {
            return name.toInt()
        } catch (e: NumberFormatException) {
            // Do nothing.
        }

        val resource = name.toLowerCase().replace("-", "_")
        return context.resources.getIdentifier(resource, "drawable", context.packageName)
    }

    /**
     * Get Crop and resize Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun cropBitmapFromUri(context: Context, uri: String, cropRegion: CGRect, targetSize: CGSize?): Bitmap {
        openBitmapInputStream(context, uri).use {
            val output = if (targetSize != null) BitmapUtils.cropAndResize(it, cropRegion, targetSize, mutableOptions())
            else BitmapUtils.crop(it, cropRegion, mutableOptions())

            return makeMutable(output)
        }
    }

    private fun makeMutable(output: Bitmap): Bitmap {
        return when {
            output.isMutable -> output
            else -> try {
                output.copy(output.config, true)
            } finally {
                output.recycle()
            }
        }
    }

    /**
     * Get Size of Image from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun dimensionFromUri(context: Context, uri: String): CGSize {
        openBitmapInputStream(context, uri).use {
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