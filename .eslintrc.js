module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
  },
  rules: {
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'react/destructuring-assignment': 0,
    'no-prototype-builtins': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-find-dom-node': 0,
    'consistent-return': 0,
    'no-console': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    semi: 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
  },
}
