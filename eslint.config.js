const js = require('@eslint/js');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],
  },
  js.configs.recommended,
];
