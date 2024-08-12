//
//  BeeImageUtils.swift
//  react-native-photo-manipulator
//
//  Created by Woraphot Chokratanasombat on 12/8/2567 BE.
//

import UIKit
import WCPhotoManipulator

@objc(ImageUtils)
public class ImageUtils: NSObject {
    @objc public class func imageFromString(_ url: String) -> UIImage? {
        return FileUtils.imageFromString(url)
    }

    @objc public class func saveTempFile(_ image: UIImage, mimeType: String, quality: CGFloat) -> String? {
        let file = FileUtils.createTempFile("", mimeType: mimeType)
        
        FileUtils.saveImageFile(image, mimeType: mimeType, quality: quality, file: file)
        return URL(fileURLWithPath: file).absoluteString
    }
}
