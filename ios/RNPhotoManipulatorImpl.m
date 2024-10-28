#import "RNPhotoManipulatorImpl.h"

#import <React/RCTImageLoader.h>
#import "ImageUtils.h"
#import "ParamUtils.h"

@import WCPhotoManipulator;

@implementation RNPhotoManipulatorImpl

const CGFloat DEFAULT_QUALITY = 100;

+ (void)batch:(NSString *)uri
        operations:(NSArray *)operations
        cropRegion:(NSDictionary *)cropRegion
        targetSize:(NSDictionary *)targetSize
        quality:(NSNumber *)quality
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        UIImage *result = [image crop:[ParamUtils cgRect:cropRegion]];
        if (targetSize != nil) {
            result = [result resize:[ParamUtils cgSize:targetSize] scale:result.scale];
        }

        for (NSDictionary *operation in operations) {
            result = [self processBatchOperation:result operation:operation bridge:bridge];
        }

        NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:[quality floatValue]];
        resolve(uri);
    }];
}

static TextStyle *toTextStyle(NSDictionary *options, NSTextAlignment alignment) {
    UIFont *font = [ParamUtils font:options[@"fontName"] size:options[@"textSize"]];
    UIColor *color = [ParamUtils color:options[@"color"]];
    CGFloat thickness = [ParamUtils cgFloat:options[@"thickness"]];
    CGFloat rotation = [ParamUtils cgFloat:options[@"rotation"]];
    CGFloat shadowRadius = [ParamUtils cgFloat:options[@"shadowRadius"]];
    CGPoint shadowOffset = [ParamUtils cgPoint:options[@"shadowOffset"]];
    UIColor *shadowColor = [ParamUtils color:options[@"shadowColor"]];
    
    TextStyle *style = [[TextStyle alloc] initWithColor:color font:font thickness:thickness rotation:rotation shadowRadius:shadowRadius shadowOffsetX:shadowOffset.x shadowOffsetY:shadowOffset.y shadowColor:shadowColor alignment:alignment];
    return style;
}

+ (UIImage *)processBatchOperation:(UIImage *)image
        operation:(NSDictionary *)operation
        bridge:(RCTBridge *)bridge {
    NSString *type = [ParamUtils string:operation[@"operation"]];

    if ([type isEqual:@"overlay"]) {
        NSString *url = [ParamUtils string:operation[@"overlay"]];
        CGPoint position = [ParamUtils cgPoint:operation[@"position"]];
        UIImage *overlay = [ImageUtils imageFromString:url];

        return [image overlayImage:overlay position:position];
    } else if ([type isEqual:@"text"]) {
        NSDictionary *options = [ParamUtils dictionary:operation[@"options"]];
        
        return printLine(image, options);
    } else if ([type isEqual:@"flip"]) {
        NSString *mode = [ParamUtils string:operation[@"mode"]];

        return [image flip:[ParamUtils flipMode:mode]];
    } else if ([type isEqual:@"rotate"]) {
        NSString *mode = [ParamUtils string:operation[@"mode"]];

        return [image rotate:[ParamUtils rotationMode:mode]];
    }
    return image;
}

+ (void)crop:(NSString *)uri
        cropRegion:(NSDictionary *)cropRegion
        targetSize:(NSDictionary *)targetSize
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        UIImage *result = nil;
        if (targetSize == nil) {
            result = [image crop:[ParamUtils cgRect:cropRegion]];
        } else {
            result = [image crop:[ParamUtils cgRect:cropRegion] targetSize:[ParamUtils cgSize:targetSize]];
        }

        NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:DEFAULT_QUALITY];
        resolve(uri);
    }];
}

+ (void)flipImage:(NSString *)uri
        mode:(NSString *)mode
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
       if (error) {
           reject(@(error.code).stringValue, error.description, error);
           return;
       }

       UIImage *result = [image flip:[ParamUtils flipMode:mode]];

       NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:DEFAULT_QUALITY];
       resolve(uri);
    }];
}

+ (void)rotateImage:(NSString *)uri
        mode:(NSString *)mode
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
       if (error) {
           reject(@(error.code).stringValue, error.description, error);
           return;
       }

       UIImage *result = [image rotate:[ParamUtils rotationMode:mode]];

       NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:DEFAULT_QUALITY];
       resolve(uri);
    }];
}

+ (void)overlayImage:(NSString *)uri
        overlay:(NSString *)overlay
        position:(NSDictionary *)position
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
       if (error) {
           reject(@(error.code).stringValue, error.description, error);
           return;
       }

        [self loadImage:bridge uri:overlay callback:^(NSError *error, UIImage *icon) {
           if (error) {
               reject(@(error.code).stringValue, error.description, error);
               return;
           }

           UIImage *result = [image overlayImage:icon position:[ParamUtils cgPoint:position]];

           NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:DEFAULT_QUALITY];
           resolve(uri);
       }];
    }];
}

static UIImage* printLine(UIImage *image, id options) {
    NSString *text = [ParamUtils string:options[@"text"]];
    CGPoint position = [ParamUtils cgPoint:options[@"position"]];

    BOOL isRTL = isTextRTL([ParamUtils string:options[@"direction"]]);
    NSTextAlignment alignment = toTextAlign(isRTL, [ParamUtils string:options[@"align"]]);
    CGPoint adjustedPosition = position;
    if (isRTL) adjustedPosition = CGPointMake(image.size.width - position.x, position.y);
    TextStyle *style = toTextStyle(options, alignment);
  
    return [image drawText:text position:adjustedPosition style:style];
}

static BOOL isTextRTL(NSString* text) {
    return [text isEqualToString:@"rtl"];
}

static NSTextAlignment toTextAlign(BOOL isRTL, NSString* align) {
    if ([align isEqualToString:@"center"]) return NSTextAlignmentCenter;
    if ([align isEqualToString:@"end"]) return isRTL ? NSTextAlignmentLeft : NSTextAlignmentRight;
    return isRTL ? NSTextAlignmentRight : NSTextAlignmentLeft;
}

+ (void)printText:(NSString *)uri
        texts:(NSArray *)texts
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
      if (error) {
          reject(@(error.code).stringValue, error.description, error);
          return;
      }
      for (id options in texts) {
          image = printLine(image, options);
      }

      NSString *uri = [ImageUtils saveTempFile:image mimeType:mimeType quality:DEFAULT_QUALITY];
      resolve(uri);
    }];
}

+ (void)optimize:(NSString *)uri
        quality:(double)quality
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [self loadImage:bridge uri:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        NSString *uri = [ImageUtils saveTempFile:image mimeType:MimeUtils.JPEG quality:quality];
        resolve(uri);
    }];
}

+ (void)loadImage:(RCTBridge *)bridge uri:(NSString *)uri callback:(RCTImageLoaderCompletionBlock)callback {
    if ([uri hasPrefix:@"data:"]) {
        return [self decodeBase64Image:uri callback:callback];
    }
    
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:callback];
}

+ (void)decodeBase64Image:(NSString *)uri callback:(RCTImageLoaderCompletionBlock)callback {
    UIImage *result = [ImageUtils imageFromString:uri];
    if (result == nil) {
        callback(RCTErrorWithMessage(@"Cannot decode base64 iamge"), nil);
        return;
    }
    callback(nil, result);
}

@end
