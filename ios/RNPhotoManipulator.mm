#import "RNPhotoManipulator.h"
#import "RNPhotoManipulatorImpl.h"

@implementation RNPhotoManipulator

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport
{
  return @{};
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_METHOD(batch:(NSString *)uri
                  operations:(NSArray *)operations
                  cropRegion:(NSDictionary *)cropRegion
                  targetSize:(NSDictionary *)targetSize
                  quality:(nonnull NSNumber *)quality
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl batch:uri operations:operations cropRegion:cropRegion targetSize:targetSize quality:quality mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(crop:(NSString *)uri
                  cropRegion:(NSDictionary *)cropRegion
                  targetSize:(NSDictionary *)targetSize
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl crop:uri cropRegion:cropRegion targetSize:targetSize mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(rotateImage:(NSString *)uri
                  mode:(NSString *)mode
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl rotateImage:uri mode:mode mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(flipImage:(NSString *)uri
                  mode:(NSString *)mode
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl flipImage:uri mode:mode mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(overlayImage:(NSString *)uri
                  overlay:(NSString *)overlay
                  position:(NSDictionary *)position
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl overlayImage:uri overlay:overlay position:position mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(printText:(NSString *)uri
                  texts:(NSArray *)texts
                  mimeType:(NSString *)mimeType
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl printText:uri texts:texts mimeType:mimeType resolve:resolve reject:reject bridge:self.bridge];
}

RCT_EXPORT_METHOD(optimize:(NSString *)uri
                  quality:(double)quality
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [RNPhotoManipulatorImpl optimize:uri quality:quality resolve:resolve reject:reject bridge:self.bridge];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
   (const facebook::react::ObjCTurboModule::InitParams &)params
{
   return std::make_shared<facebook::react::NativeRNPhotoManipulatorSpecJSI>(params);
}
#endif

@end
