
package com.guhungry.rnphotomanipulator;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class RNPhotoManipulatorPackage extends TurboReactPackage {
    @Nullable
    @Override
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
        if (name.equals(RNPhotoManipulatorModuleImpl.NAME)) {
            return new RNPhotoManipulatorModule(reactContext);
        }
        return null;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            boolean turboModulesEnabled = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            moduleInfos.put(
                    RNPhotoManipulatorModuleImpl.NAME,
                    new ReactModuleInfo(
                            RNPhotoManipulatorModuleImpl.NAME,
                            RNPhotoManipulatorModuleImpl.NAME,
                            false, // canOverrideExistingModule
                            false, // needsEagerInit
                            false, // hasConstants
                            false, // isCxxModule
                            turboModulesEnabled // isTurboModule
                    ));
            return moduleInfos;
        };
    }
}
