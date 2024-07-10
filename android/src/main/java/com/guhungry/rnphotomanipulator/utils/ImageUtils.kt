package com.guhungry.rnphotomanipulator.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import com.guhungry.photomanipulator.*
import com.guhungry.photomanipulator.model.CGRect
import com.guhungry.photomanipulator.model.CGSize
import java.io.InputStream
import java.util.*

object ImageUtils {
    /**
     * Get Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmOverloads
    @JvmStatic fun bitmapFromUri(context: Context, uri: String, options: BitmapFactory.Options? = null): Bitmap {
        openBitmapInputStream(context, uri).use { image ->
            val matrix = openBitmapInputStream(context, uri).use {
                BitmapUtils.getCorrectOrientationMatrix(it)
            }

            val bitmap: Bitmap = BitmapFactory.decodeStream(image, null, options)!!

            return if (matrix != null) Bitmap.createBitmap(bitmap, 0, 0, bitmap.width,
                bitmap.height, matrix, true).also { bitmap.recycle()  } else bitmap
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

        val resource = name.lowercase(Locale.getDefault()).replace("-", "_")
        return context.resources.getIdentifier(resource, "drawable", context.packageName)
    }

    /**
     * Get Crop and resize Bitmap from Image Uri
     *
     * @param context
     * @param uri Uri of Image file
     */
    @JvmStatic fun cropBitmapFromUri(context: Context, uri: String, cropRegion: CGRect, targetSize: CGSize?): Bitmap {
        openBitmapInputStream(context, uri).use { image ->
            val output = if (targetSize == null) BitmapUtils.crop(image, cropRegion, mutableOptions())
            else {
                val matrix = openBitmapInputStream(context, uri).use {
                    BitmapUtils.getCorrectOrientationMatrix(it)
                }

                BitmapUtils.cropAndResize(image, cropRegion, targetSize, mutableOptions(), matrix)
            }

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
     * Save image to temp file
     *
     * @param context
     */
    @JvmStatic fun saveTempFile(context: Context, image: Bitmap, mimeType: String, prefix: String, quality: Int): String {
        val file = FileUtils.createTempFile(context, prefix, mimeType)
        FileUtils.saveImageFile(image, mimeType, quality, file)

        return Uri.fromFile(file).toString()
    }
}