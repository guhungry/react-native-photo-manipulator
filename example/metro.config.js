const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const extraNodeModules = {
  'react-native-photo-manipulator': path.resolve(__dirname, '..'),
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [extraNodeModules['react-native-photo-manipulator']],
  resolver: {
    extraNodeModules,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
