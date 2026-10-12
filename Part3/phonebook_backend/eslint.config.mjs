import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],

    ignores: ['node_modules/**', 'dist/**'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },

    rules: {
      ...js.configs.recommended.rules,
    },
  },
]