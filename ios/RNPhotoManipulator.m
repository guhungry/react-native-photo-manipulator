
#import "RNPhotoManipulator.h"

@implementation RNPhotoManipulator

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(batch:(NSString *)uri
                  size:(NSDictionary *)size
                  quality:(NSInteger)quality
                  operations:(NSArray *)operations
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(overlayImage:(NSString *)uri
                  icon:(NSArray *)icon
                  position:(NSDictionary *)position
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(printText:(NSString *)uri
                  list:(NSArray *)list
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(optimize:(NSString *)uri
                  quality:(NSInteger)quality
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

RCT_EXPORT_METHOD(resize:(NSString *)uri
                  targetSize:(NSDictionary *)targetSize
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    resolve(uri);
}

@end
