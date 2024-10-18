import js from '@eslint/js'
import globals from 'globals'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['tsconfig.node.json', 'tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'prettier': prettierPlugin
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintReact.configs.recommended.rules,
      ...eslintReact.configs['jsx-runtime'].rules,
      ...eslintReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-floating-promises': [
        'off'
      ],
      'react-hooks/exhaustive-deps': [
        'off'
      ],
      '@typescript-eslint/no-unsafe-argument': [
        'off'
      ],
      '@typescript-eslint/no-unsafe-member-access': [
        'off'
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'off'
      ],
      '@typescript-eslint/no-unsafe-assignment': [
        'off'
      ],
      '@typescript-eslint/no-unsafe-call': [
        'off'
      ],
      '@typescript-eslint/no-unsafe-return': [
        'off'
      ],
      '@typescript-eslint/no-redundant-type-constituents': [
        'off'
      ]
    },
  },
)
