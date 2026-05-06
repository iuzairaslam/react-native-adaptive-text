const path = require('path');

const exampleNM = path.resolve(__dirname, 'node_modules');

module.exports = {
  preset: 'react-native',
  /**
   * `react-native-adaptive-text` is linked via `file:..`; Jest resolves it to the
   * repo path (outside `node_modules/`), so it no longer matches the preset's
   * ignore rule and Babel would re-transform `dist/` and inject `@babel/runtime`
   * helpers. Never transform our prebuilt `dist/` (or `src/` if resolved).
   */
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
    '[/\\\\]react-native-adaptive-text[/\\\\]dist[/\\\\]',
    '[/\\\\]react-native-adaptive-text[/\\\\]src[/\\\\]',
  ],
  /**
   * The library lives under the repo root, which has its own `react` (devDep).
   * Pin `react` / `react-native` to this example's copies so hooks match
   * `react-test-renderer` (invalid hook call otherwise).
   */
  moduleNameMapper: {
    '^react$': path.join(exampleNM, 'react'),
    '^react/jsx-runtime$': path.join(exampleNM, 'react/jsx-runtime.js'),
    '^react/jsx-dev-runtime$': path.join(exampleNM, 'react/jsx-dev-runtime.js'),
    '^react-native$': path.join(exampleNM, 'react-native'),
  },
};
