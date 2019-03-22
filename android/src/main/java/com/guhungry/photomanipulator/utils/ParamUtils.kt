package com.guhungry.photomanipulator.utils

import android.graphics.Color
import android.graphics.PointF
import com.facebook.react.bridge.ReadableMap
import com.guhungry.photomanipulator.CGSize

/**
 * Parameter Utilities for Convert JS Parameter to Native Java
 */
object ParamUtils {
    // PointF
    @JvmStatic fun pointfFromMap(map: ReadableMap): PointF = pointfFromXY(map.getInt("x"), map.getInt("y"))
    @JvmStatic fun pointfFromXY(x: Int, y: Int): PointF = PointF(x.toFloat(), y.toFloat())

    // Color
    @JvmStatic fun colorFromMap(map: ReadableMap): Int = Color.argb(map.getInt("a"), map.getInt("r"), map.getInt("g"), map.getInt("b"))

    // CGSize
    @JvmStatic fun sizeFromMap(map: ReadableMap): CGSize = CGSize(map.getInt("width"), map.getInt("height"))
}