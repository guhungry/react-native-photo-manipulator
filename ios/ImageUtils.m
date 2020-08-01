//
//  ImageUtils.m
//  RNPhotoManipulator
//
//  Created by Woraphot Chokratanasombat on 25/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ImageUtils.h"

@import WCPhotoManipulator;

@implementation ImageUtils

+ (UIImage *)imageFromUrl:(NSURL *)url {
    return [FileUtils imageFromUrl:url];
}

+ (NSString *)saveTempFile:(UIImage *)image mimeType:(NSString *)mimeType quality:(CGFloat)quality {
    NSString *file = [FileUtils createTempFile:@"" mimeType:mimeType];
    [FileUtils saveImageFile:image mimeType:mimeType quality:quality file:file];
    
    return [NSURL fileURLWithPath:file].absoluteString;
}

@end
