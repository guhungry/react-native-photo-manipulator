/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif

// Avoid multiple includes of RNPhotoManipulatorSpec symbols
#ifndef RNPhotoManipulatorSpec_H
#define RNPhotoManipulatorSpec_H

#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>


@protocol NativeRNPhotoManipulatorSpec <RCTBridgeModule, RCTTurboModule>

- (void)batch:(NSString *)image
   operations:(NSArray *)operations
   cropRegion:(NSDictionary *)cropRegion
   targetSize:(NSDictionary *)targetSize
      quality:(NSNumber *)quality
     mimeType:(NSString *)mimeType
      resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject;
- (void)crop:(NSString *)image
  cropRegion:(NSDictionary *)cropRegion
  targetSize:(NSDictionary *)targetSize
    mimeType:(NSString *)mimeType
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject;
- (void)flipImage:(NSString *)image
             mode:(NSString *)mode
         mimeType:(NSString *)mimeType
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (void)rotateImage:(NSString *)image
               mode:(NSString *)mode
           mimeType:(NSString *)mimeType
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject;
- (void)overlayImage:(NSString *)image
             overlay:(NSString *)overlay
            position:(NSDictionary *)position
            mimeType:(NSString *)mimeType
             resolve:(RCTPromiseResolveBlock)resolve
              reject:(RCTPromiseRejectBlock)reject;
- (void)printText:(NSString *)image
            texts:(NSArray *)texts
         mimeType:(NSString *)mimeType
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (void)optimize:(NSString *)image
         quality:(double)quality
         resolve:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject;

@end
namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRNPhotoManipulator'
   */
  class JSI_EXPORT NativeRNPhotoManipulatorSpecJSI : public ObjCTurboModule {
  public:
    NativeRNPhotoManipulatorSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

#endif // RNPhotoManipulatorSpec_H