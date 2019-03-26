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
    
    return [UIColor colorWithRed:[RCTConvert CGFloat:color[@"r"]] green:[RCTConvert CGFloat:color[@"g"]] blue:[RCTConvert CGFloat:color[@"b"]] alpha:[RCTConvert CGFloat:color[@"a"]] / 255];
}

@end
