//
//  BeeParamUtils.swift
//  react-native-photo-manipulator
//
//  Created by Woraphot Chokratanasombat on 12/8/2567 BE.
//

import React
import UIKit
import WCPhotoManipulator

@objc(ParamUtils)
public class ParamUtils: NSObject {
    @objc public class func url(_ value: String) -> URLRequest? {
        guard let url = URL(string: value) else {
            return nil
        }
        
        return URLRequest(url: url)
    }

    @objc public class func font(_ name: Any?, size: Any) -> UIFont {
        let size = cgFloat(size)
        guard let name = string(name) else {
            return UIFont.systemFont(ofSize: size)
        }
        return UIFont(name: name, size: size)
            ?? UIFont.systemFont(ofSize: size)
    }
    
    @objc public class func color(_ data: Any) -> UIColor? {
        guard let data = dictionary(data) else {
            return nil
        }
        guard let r = data["r"], let g = data["g"],
              let b = data["b"], let a = data["a"] else {
            return nil
        }
        return UIColor(
            red: colorComponent(r),
            green: colorComponent(g),
            blue: colorComponent(b),
            alpha: colorComponent(a)
        )
    }
    
    @objc public class func dictionary(_ value: Any?) -> Dictionary<AnyHashable, Any>? {
        guard let value = value else {
            return nil
        }
        return RCTConvert.nsDictionary(value)
    }
    
    @objc public class func string(_ value: Any?) -> String? {
        guard let value = value else {
            return nil
        }
        return RCTConvert.nsString(value)
    }
    
    @objc public class func cgSize(_ value: Any) -> CGSize {
        return RCTConvert.cgSize(value)
    }
    
    @objc public class func cgPoint(_ value: Any) -> CGPoint {
        return RCTConvert.cgPoint(value)
    }
    
    @objc public class func cgRect(_ value: Any) -> CGRect {
        return RCTConvert.cgRect(value)
    }
    
    @objc public class func cgFloat(_ value: Any) -> CGFloat {
        return RCTConvert.cgFloat(value)
    }
    
    private class func colorComponent(_ value: Any) -> CGFloat {
        return cgFloat(value) / 255
    }
    
    @objc public class func flipMode(_ mode: String?) -> FlipMode {
        guard let mode = mode else {
            return .None
        }
        switch mode.lowercased() {
        case "both":
            return .Both
        case "vertical":
            return .Vertical
        case "horizontal":
            return .Horizontal
        default:
            return .None
        }
    }
    
    @objc public class func rotationMode(_ mode: String?) -> RotationMode {
        guard let mode = mode else {
            return .None
        }
        switch mode.lowercased() {
        case "r90":
            return .R90
        case "r180":
            return .R180
        case "r270":
            return .R270
        default:
            return .None
        }
    }
}
