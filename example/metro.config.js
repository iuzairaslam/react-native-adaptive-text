const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * Library `../src` lives outside `example/`. Default Metro walks upward from
 * each file and hits `../node_modules/react` (the package devDependency) before
 * the app’s React → invalid hook call. We pin lookups to the example’s
 * `node_modules` and keep the library on `watchFolders`.
 *
 * @type {import('metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');
const exampleNodeModules = path.resolve(projectRoot, 'node_modules');

const config = {
  watchFolders: [libraryRoot],
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [exampleNodeModules],
    extraNodeModules: {
      'react-native-adaptive-text': libraryRoot,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
