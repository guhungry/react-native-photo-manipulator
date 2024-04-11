
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPhotoManipulatorSpec.h"

@interface RNPhotoManipulator : NSObject <NativeRNPhotoManipulatorSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNPhotoManipulator : NSObject <RCTBridgeModule>
#endif

@end
