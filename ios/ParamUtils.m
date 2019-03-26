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

+ (UIColor *)color:(NSDictionary *)data {
    NSDictionary *color = [RCTConvert NSDictionary:data];
    
    return [UIColor colorWithRed:[ParamUtils colorComponent:color[@"r"]] green:[ParamUtils colorComponent:color[@"g"]] blue:[ParamUtils colorComponent:color[@"b"]] alpha:[ParamUtils colorComponent:color[@"a"]]];
}

+ (CGFloat)colorComponent:(id)color {
    return [RCTConvert CGFloat:color] / 255;
}

@end
