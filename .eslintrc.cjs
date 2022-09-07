'use strict'

const { overrides } = require('@netlify/eslint-config-node')

module.exports = {
  extends: '@netlify/eslint-config-node',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [2, 'ignorePackages', { "ts": "never", }],
  },
  overrides: [...overrides],
  "ignorePatterns": ['src/deno_std_lib/*']
}
