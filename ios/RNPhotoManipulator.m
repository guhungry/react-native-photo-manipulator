
#import "RNPhotoManipulator.h"
#import "ImageUtils.h"
#import "ParamUtils.h"

#import <React/RCTConvert.h>
#import <React/RCTImageLoader.h>

#import <WCPhotoManipulator/UIImage+PhotoManipulator.h>
#import <WCPhotoManipulator/MimeUtils.h>

@implementation RNPhotoManipulator

@synthesize bridge = _bridge;

const CGFloat DEFAULT_QUALITY = 100;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(batch:(NSURLRequest *)uri
                  operations:(NSArray *)operations
                  cropRegion:(NSDictionary *)cropRegion
                  targetSize:(NSDictionary *)targetSize
                  quality:(NSInteger)quality
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [self.bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }
        
        UIImage *result = [image crop:[RCTConvert CGRect:cropRegion]];
        if (targetSize != nil) {
            result = [result resize:[RCTConvert CGSize:targetSize] scale:result.scale];
        }
        
        for (NSDictionary *operation in operations) {
            result = [self processBatchOperation:result operation:operation];
        }
        
        NSString *uri = [ImageUtils saveTempFile:result mimeType:MimeUtils.JPEG quality:quality];
        resolve(uri);
    }];
}

- (UIImage *)processBatchOperation:(UIImage *)image operation:(NSDictionary *)operation {
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
        CGFloat textSize = [RCTConvert CGFloat:options[@"textSize"]];
        UIColor *color = [ParamUtils color:options[@"color"]];
        CGFloat thickness = [RCTConvert CGFloat:options[@"thickness"]];
        
        return [image drawText:text position:position color:color size:textSize thickness:thickness];
    }
    return image;
}

RCT_EXPORT_METHOD(crop:(NSURLRequest *)uri
                  cropRegion:(NSDictionary *)cropRegion
                  targetSize:(NSDictionary *)targetSize
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [self.bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
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

        NSString *uri = [ImageUtils saveTempFile:result mimeType:MimeUtils.JPEG quality:DEFAULT_QUALITY];
        resolve(uri);
    }];
}

RCT_EXPORT_METHOD(overlayImage:(NSURLRequest *)uri
                  icon:(NSURLRequest *)icon
                  position:(NSDictionary *)position
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    [self.bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }
        
        [self->_bridge.imageLoader loadImageWithURLRequest:icon callback:^(NSError *error, UIImage *icon) {
            if (error) {
                reject(@(error.code).stringValue, error.description, error);
                return;
            }
            
            UIImage *result = [image overlayImage:icon position:[RCTConvert CGPoint:position]];
            
            NSString *uri = [ImageUtils saveTempFile:result mimeType:MimeUtils.JPEG quality:DEFAULT_QUALITY];
            resolve(uri);
        }];
    }];
}

RCT_EXPORT_METHOD(printText:(NSURLRequest *)uri
                  list:(NSArray *)list
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    [self.bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }
        for (id options in list) {
            NSString *text = [RCTConvert NSString:options[@"text"]];
            CGPoint position = [RCTConvert CGPoint:options[@"position"]];
            CGFloat textSize = [RCTConvert CGFloat:options[@"textSize"]];
            UIColor *color = [ParamUtils color:options[@"color"]];
            CGFloat thickness = [RCTConvert CGFloat:options[@"thickness"]];
            
            image = [image drawText:text position:position color:color size:textSize thickness:thickness];
        }
        
        NSString *uri = [ImageUtils saveTempFile:image mimeType:MimeUtils.JPEG quality:DEFAULT_QUALITY];
        resolve(uri);
    }];
}

RCT_EXPORT_METHOD(optimize:(NSURLRequest *)uri
                  quality:(NSInteger)quality
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

@end
