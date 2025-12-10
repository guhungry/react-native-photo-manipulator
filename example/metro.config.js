const path = require('path');
const pkg = require('../package.json');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

const localModulePath = path.resolve(__dirname, '../');

module.exports = makeMetroConfig({
  watchFolders: [localModulePath],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      [pkg.name]: localModulePath,
    },
  },
});
