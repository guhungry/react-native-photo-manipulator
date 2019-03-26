//
//  ImageUtils.h
//  RNPhotoManipulator
//
//  Created by Woraphot Chokratanasombat on 25/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ImageUtils : NSObject

+ (UIImage *)imageFromUrl:(NSURL *)url;
+ (NSString *)saveTempFile:(UIImage *)image mimeType:(NSString *)mimeType quality:(CGFloat)quality;

@end

NS_ASSUME_NONNULL_END
