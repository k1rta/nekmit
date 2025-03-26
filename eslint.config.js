module.exports = [
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      sourceType: 'module',
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      'prettier/prettier': 'error',
      indent: ['error', 2],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      curly: ['error', 'multi-line'],
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'import/no-unresolved': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src', 'cypress/utils'],
        },
      },
    },
  },
]
