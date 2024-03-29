//
//  ParamUtils.h
//  RNPhotoManipulator
//
//  Created by Woraphot Chokratanasombat on 26/3/2562 BE.
//  Copyright © 2562 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ParamUtils : NSObject

+ (UIFont *)font:(id)name size:(id)size;
+ (UIColor *)color:(NSDictionary *)data;
+ (enum FlipMode)flipMode:(NSString *)mode;

@end

NS_ASSUME_NONNULL_END
