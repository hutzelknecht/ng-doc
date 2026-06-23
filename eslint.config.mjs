import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...nx.configs['flat/base'],
  ...compat
    .config({
      extends: ['prettier', 'plugin:jsdoc/recommended'],
      plugins: ['eslint-plugin-jsdoc', 'eslint-plugin-prefer-arrow', 'simple-import-sort'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      ignores: ['**/__mocks__/**'],
      rules: {
        ...config.rules,
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allowCircularSelfDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: ['type:lib'],
              },
              {
                sourceTag: 'lib:app',
                onlyDependOnLibsWithTags: ['lib:builder', 'lib:ui-kit', 'lib:core'],
              },
              {
                sourceTag: 'lib:builder',
                onlyDependOnLibsWithTags: ['lib:core', 'lib:utils'],
              },
              {
                sourceTag: 'lib:ui-kit',
                onlyDependOnLibsWithTags: ['lib:core'],
              },
              {
                sourceTag: 'lib:utils',
                onlyDependOnLibsWithTags: ['lib:core'],
              },
              {
                sourceTag: 'lib:keywords-loaders',
                onlyDependOnLibsWithTags: ['lib:core'],
              },
            ],
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'any',
          },
        ],
      },
    })),
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/typedef': [
        'error',
        {
          arrowParameter: false,
          memberVariableDeclaration: false,
          objectDestructuring: false,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: false,
          variableDeclarationIgnoreFunction: true,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
          overrides: {
            constructors: 'off',
          },
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
    ignores: ['**/__mocks__/**'],
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
    ignores: ['**/__mocks__/**'],
  },
];
