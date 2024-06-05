//
//  ParamUtils.m
//  RNPhotoManipulator
//
//  Created by Woraphot Chokratanasombat on 26/3/2562 BE.
//  Copyright © 2562 Facebook. All rights reserved.
//

#import "ParamUtils.h"
#import <React/RCTConvert.h>

@import WCPhotoManipulator;

@implementation ParamUtils

+ (NSURLRequest *)url:(NSString *)value {
    return [NSURLRequest requestWithURL:[NSURL URLWithString:value]];
}

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

+ (enum FlipMode: int)flipMode:(NSString *)mode {
    if ([mode isEqualToString:@"Both"]) {
        return FlipModeBoth;
    } else if ([mode isEqualToString:@"Horizontal"]) {
        return FlipModeHorizontal;
    } else if ([mode isEqualToString:@"Vertical"]) {
        return FlipModeVertical;
    }
    return FlipModeNone;
}

+ (enum RotationMode: int)rotationMode:(NSString *)mode {
    if ([mode isEqualToString:@"R90"]) {
        return RotationModeR90;
    } else if ([mode isEqualToString:@"R180"]) {
        return RotationModeR180;
    } else if ([mode isEqualToString:@"R270"]) {
        return RotationModeR270;
    }
    return RotationModeNone;
}

@end
