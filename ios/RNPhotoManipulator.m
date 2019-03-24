
#import "RNPhotoManipulator.h"

#import <React/RCTConvert.h>
#import <React/RCTImageLoader.h>

#import <WCPhotoManipulator/UIImage+PhotoManipulator.h>

@implementation RNPhotoManipulator

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(batch:(NSURLRequest *)uri
                  size:(NSDictionary *)size
                  quality:(NSInteger)quality
                  operations:(NSArray *)operations
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [self->_bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }
        
        UIImage *result = [image resize:[RCTConvert CGSize:size] scale:image.scale];
        
        resolve(result);
    }];
}

RCT_EXPORT_METHOD(overlayImage:(NSURLRequest *)uri
                  icon:(NSURLRequest *)icon
                  position:(NSDictionary *)position
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    [self->_bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
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
            
            resolve(result);
        }];
    }];
}

RCT_EXPORT_METHOD(printText:(NSURLRequest *)uri
                  list:(NSArray *)list
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(optimize:(NSURLRequest *)uri
                  quality:(NSInteger)quality
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(resize:(NSURLRequest *)uri
                  targetSize:(NSDictionary *)targetSize
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    [self->_bridge.imageLoader loadImageWithURLRequest:uri callback:^(NSError *error, UIImage *image) {
        if (error) {
            reject(@(error.code).stringValue, error.description, error);
            return;
        }
        
        UIImage *result = [image resize:[RCTConvert CGSize:targetSize] scale:image.scale];
        
        resolve(result);
    }];
}

@end
