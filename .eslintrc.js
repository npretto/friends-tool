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
  plugins: ['react', 'prefer-arrow'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'prefer-arrow/prefer-arrow-functions': 2,
    'react-hooks/exhaustive-deps': 'off', // if you're curious why ask me, tldr: i think it makes the code less immediate to read,
  },
};
