#import "RNPhotoManipulatorImpl.h"
#import "ImageUtils.h"
#import "ParamUtils.h"

#import <React/RCTConvert.h>
#import <React/RCTImageLoader.h>

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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        UIImage *result = [image crop:[RCTConvert CGRect:cropRegion]];
        if (targetSize != nil) {
            result = [result resize:[RCTConvert CGSize:targetSize] scale:result.scale];
        }

        for (NSDictionary *operation in operations) {
            result = [self processBatchOperation:result operation:operation bridge:bridge];
        }

        NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:[quality floatValue]];
        resolve(uri);
    }];
}

+ (UIImage *)processBatchOperation:(UIImage *)image
        operation:(NSDictionary *)operation
        bridge:(RCTBridge *)bridge {
    NSString *type = [RCTConvert NSString:operation[@"operation"]];

    if ([type isEqual:@"overlay"]) {
        NSURL *url = [RCTConvert NSURL:operation[@"overlay"]];
        CGPoint position = [RCTConvert CGPoint:operation[@"position"]];
        UIImage *overlay = [ImageUtils imageFromUrl:url];

        return [image overlayImage:overlay position:position];
    } else if ([type isEqual:@"text"]) {
        NSDictionary *options = [RCTConvert NSDictionary:operation[@"options"]];

        NSString *text = [RCTConvert NSString:options[@"text"]];
        CGPoint position = [RCTConvert CGPoint:options[@"position"]];
        UIFont *font = [ParamUtils font:options[@"fontName"] size:options[@"textSize"]];
        UIColor *color = [ParamUtils color:options[@"color"]];
        CGFloat thickness = [RCTConvert CGFloat:options[@"thickness"]];
        CGFloat rotation = [RCTConvert CGFloat:options[@"rotation"]];

        return [image drawText:text position:position color:color font:font thickness:thickness rotation:rotation];
    } else if ([type isEqual:@"flip"]) {
        NSString *mode = [RCTConvert NSString:operation[@"mode"]];

        return [image flip:[ParamUtils flipMode:mode]];
    } else if ([type isEqual:@"rotate"]) {
        NSString *mode = [RCTConvert NSString:operation[@"mode"]];

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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        UIImage *result = nil;
        if (targetSize == nil) {
            result = [image crop:[RCTConvert CGRect:cropRegion]];
        } else {
            result = [image crop:[RCTConvert CGRect:cropRegion] targetSize:[RCTConvert CGSize:targetSize]];
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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
       if (error) {
           reject(@(error.code).stringValue, error.description, error);
           return;
       }

       [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:overlay] callback:^(NSError *error, UIImage *icon) {
           if (error) {
               reject(@(error.code).stringValue, error.description, error);
               return;
           }

           UIImage *result = [image overlayImage:icon position:[RCTConvert CGPoint:position]];

           NSString *uri = [ImageUtils saveTempFile:result mimeType:mimeType quality:DEFAULT_QUALITY];
           resolve(uri);
       }];
    }];
}

+ (void)printText:(NSString *)uri
        texts:(NSArray *)texts
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge {
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
      if (error) {
          reject(@(error.code).stringValue, error.description, error);
          return;
      }
      for (id options in texts) {
          NSString *text = [RCTConvert NSString:options[@"text"]];
          CGPoint position = [RCTConvert CGPoint:options[@"position"]];
          UIFont *font = [ParamUtils font:options[@"fontName"] size:options[@"textSize"]];
          UIColor *color = [ParamUtils color:options[@"color"]];
          CGFloat thickness = [RCTConvert CGFloat:options[@"thickness"]];
          CGFloat rotation = [RCTConvert CGFloat:options[@"rotation"]];

          TextStyle *style = [[TextStyle alloc] initWithColor:color font:font thickness:thickness rotation:rotation];
          image = [image drawText:text position:position style:style];
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
    [[bridge moduleForClass:[RCTImageLoader class]] loadImageWithURLRequest:[ParamUtils url:uri] callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }

        NSString *uri = [ImageUtils saveTempFile:image mimeType:MimeUtils.JPEG quality:quality];
        resolve(uri);
    }];
}

@end
