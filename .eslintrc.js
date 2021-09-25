module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
  },
};
