## Friends Tools

An app I was tasked to do as a test, made with react-native/expo

I used redux toolkit to manage the state, leaving as little logic in components as possible.

UI components are taken form [native-base](https://github.com/GeekyAnts/NativeBase)|

i18n is handled with i18n-js but currently there are only strings for en

### pre commit hook

There's a precommit hook setup with husky and lint-staged that does the following:

- organizes imports with organize-imports-cli
- format changes with prettier
- check changes for problems with eslint
- run tsc to typecheck the code (currently disabled because it fails on some native base code)
- run tests
