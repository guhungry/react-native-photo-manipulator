#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNPhotoManipulatorImpl : NSObject

+ (void)batch:(NSString *)uri
        operations:(NSArray *)operations
        cropRegion:(NSDictionary *)cropRegion
        targetSize:(NSDictionary *)targetSize
        quality:(NSNumber *)quality
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)crop:(NSString *)uri
        cropRegion:(NSDictionary *)cropRegion
        targetSize:(NSDictionary *)targetSize
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)flipImage:(NSString *)uri
        mode:(NSString *)mode
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)rotateImage:(NSString *)uri
        mode:(NSString *)mode
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)overlayImage:(NSString *)uri
        overlay:(NSString *)overlay
        position:(NSDictionary *)position
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)printText:(NSString *)uri
        texts:(NSArray *)texts
        mimeType:(NSString *)mimeType
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;

+ (void)optimize:(NSString *)uri
        quality:(double)quality
        resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
        bridge:(RCTBridge *)bridge;
@end

NS_ASSUME_NONNULL_END
