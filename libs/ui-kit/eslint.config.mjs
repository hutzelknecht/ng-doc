import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ngDoc',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
  {
    // templateAccessibility rules became part of flat/angular-template in @nx/eslint-plugin
    // and were never enabled in this workspace's legacy config; turn them back off rather
    // than retrofitting existing templates.
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/alt-text': 'off',
    },
  },
];
