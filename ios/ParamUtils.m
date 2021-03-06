//
//  ParamUtils.m
//  RNPhotoManipulator
//
//  Created by Woraphot Chokratanasombat on 26/3/2562 BE.
//  Copyright © 2562 Facebook. All rights reserved.
//

#import "ParamUtils.h"
#import <React/RCTConvert.h>

@implementation ParamUtils

+ (UIFont *)font:(id)name size:(id)size {
    NSString* fontName = [RCTConvert NSString:name];
    CGFloat fontSize = [RCTConvert CGFloat:size];

    return [UIFont fontWithName:fontName size:fontSize];
}

+ (UIColor *)color:(NSDictionary *)data {
    NSDictionary *color = [RCTConvert NSDictionary:data];
    
    return [UIColor colorWithRed:[ParamUtils colorComponent:color[@"r"]] green:[ParamUtils colorComponent:color[@"g"]] blue:[ParamUtils colorComponent:color[@"b"]] alpha:[ParamUtils colorComponent:color[@"a"]]];
}

+ (CGFloat)colorComponent:(id)color {
    return [RCTConvert CGFloat:color] / 255;
}

@end
