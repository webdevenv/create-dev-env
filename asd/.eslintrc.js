module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  extends: [
    'google',
    'problems',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],

  plugins: ['fp', 'prettier'],
  rules: {
    /*
    <==========================================>
    <                 EsLint                   >
    <==========================================>
    */
    'no-console': 1,
    'prefer-const': 1,
    'prefer-arrow-callback': 1,
    'no-unused-vars': 0,
    'no-var': 2,
    'no-buffer-constructor': 0,
    strict: 2,
    'switch-colon-spacing': 0,
    'consistent-return': 1,
    'comma-dangle': [0, 'always-multiline'],
    /*
    <==========================================>
    <          Functional programming          >
    <==========================================>
    */
    'fp/no-arguments': 2,
    'fp/no-class': 0,
    'fp/no-delete': 2,
    'fp/no-events': 2,
    'fp/no-get-set': 2,
    'fp/no-let': 0,
    'fp/no-loops': 1,
    'fp/no-nil': 0,
    'fp/no-proxy': 2,
    'fp/no-rest-parameters': 2,
    'fp/no-throw': 2,
    'fp/no-valueof-field': 2,
    'fp/no-mutation': 0,
    'fp/no-mutating-assign': 1,
    'fp/no-mutating-methods': 0,
    'fp/no-this': 1,
    'fp/no-unused-expression': 0,
    /*
    <==========================================>
    <                  Others                  >
    <==========================================>
    */
    'prettier/prettier': [
      2,
      {
        usePrettierrc: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 65,
        eslintIntegration: true,
      },
    ],
  },
};
