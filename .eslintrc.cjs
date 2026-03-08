module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  globals: {
    __BUILD_VERSION__: 'readonly',
    __BUILD_DATE__: 'readonly',
  },
  rules: {
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
  },
  overrides: [
    {
      files: ['vite.config.js', 'setupTests.js', 'src/setupTests.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
