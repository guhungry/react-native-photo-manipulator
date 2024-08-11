package com.guhungry.rnphotomanipulator.utils

import android.graphics.Color
import android.graphics.PointF
import com.facebook.react.bridge.ReadableMap
import com.guhungry.photomanipulator.model.CGRect
import com.guhungry.photomanipulator.model.CGSize
import com.guhungry.photomanipulator.model.FlipMode
import com.guhungry.photomanipulator.model.RotationMode

/**
 * Parameter Utilities for Convert JavaScript Parameter to Native Object
 */
object ParamUtils {
    // PointF
    @JvmStatic fun toPointF(map: ReadableMap?): PointF? = map?.let { toPointF(it.getInt("x"), it.getInt("y")) }
    @JvmStatic fun toPointF(x: Number, y: Number): PointF = PointF(x.toFloat(), y.toFloat())

    // Color
    @JvmStatic fun toColorInt(map: ReadableMap?): Int? = map?.let { Color.argb(it.getInt("a"), it.getInt("r"), it.getInt("g"), it.getInt("b")) }

    // CGRect
    @JvmStatic fun toCGRect(map: ReadableMap): CGRect = CGRect(map.getInt("x"), map.getInt("y"), map.getInt("width"), map.getInt("height"))

    // CGSize
    @JvmStatic fun toCGSize(map: ReadableMap?): CGSize? = if (map != null) CGSize(map.getInt("width"), map.getInt("height")) else null

    // FlipMode
    @JvmStatic fun toFlipMode(mode: String): FlipMode = runCatching { FlipMode.valueOf(mode) }.getOrDefault(FlipMode.None)

    // FlipMode
    @JvmStatic fun toRotationMode(mode: String): RotationMode = runCatching { RotationMode.valueOf(mode) }.getOrDefault(RotationMode.None)
}
