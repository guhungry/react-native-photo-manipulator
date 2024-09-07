
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleJniCpp.js
 */

#include "RNPhotoManipulatorSpec.h"

namespace facebook::react {

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_batch(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "batch", "(Ljava/lang/String;Lcom/facebook/react/bridge/ReadableArray;Lcom/facebook/react/bridge/ReadableMap;Lcom/facebook/react/bridge/ReadableMap;Ljava/lang/Double;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_crop(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "crop", "(Ljava/lang/String;Lcom/facebook/react/bridge/ReadableMap;Lcom/facebook/react/bridge/ReadableMap;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_flipImage(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "flipImage", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_rotateImage(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "rotateImage", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_overlayImage(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "overlayImage", "(Ljava/lang/String;Ljava/lang/String;Lcom/facebook/react/bridge/ReadableMap;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_printText(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "printText", "(Ljava/lang/String;Lcom/facebook/react/bridge/ReadableArray;Ljava/lang/String;Lcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeRNPhotoManipulatorSpecJSI_optimize(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, PromiseKind, "optimize", "(Ljava/lang/String;DLcom/facebook/react/bridge/Promise;)V", args, count, cachedMethodId);
}

NativeRNPhotoManipulatorSpecJSI::NativeRNPhotoManipulatorSpecJSI(const JavaTurboModule::InitParams &params)
  : JavaTurboModule(params) {
  methodMap_["batch"] = MethodMetadata {6, __hostFunction_NativeRNPhotoManipulatorSpecJSI_batch};
  methodMap_["crop"] = MethodMetadata {4, __hostFunction_NativeRNPhotoManipulatorSpecJSI_crop};
  methodMap_["flipImage"] = MethodMetadata {3, __hostFunction_NativeRNPhotoManipulatorSpecJSI_flipImage};
  methodMap_["rotateImage"] = MethodMetadata {3, __hostFunction_NativeRNPhotoManipulatorSpecJSI_rotateImage};
  methodMap_["overlayImage"] = MethodMetadata {4, __hostFunction_NativeRNPhotoManipulatorSpecJSI_overlayImage};
  methodMap_["printText"] = MethodMetadata {3, __hostFunction_NativeRNPhotoManipulatorSpecJSI_printText};
  methodMap_["optimize"] = MethodMetadata {2, __hostFunction_NativeRNPhotoManipulatorSpecJSI_optimize};
}

std::shared_ptr<TurboModule> RNPhotoManipulatorSpec_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params) {
  if (moduleName == "RNPhotoManipulator") {
    return std::make_shared<NativeRNPhotoManipulatorSpecJSI>(params);
  }
  return nullptr;
}

} // namespace facebook::react