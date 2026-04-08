import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginVuetify from 'eslint-plugin-vuetify';
import standard from '@vue/eslint-config-standard';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  js.configs.recommended,
  // consider switching to `pluginVue.configs['flat/strongly-recommended']` or `pluginVue.configs['flat/recommended']` for stricter rules.
  ...pluginVue.configs['flat/essential'],
  ...pluginVuetify.configs['flat/recommended'],
  ...standard,

  {
    rules: {
      // 'no-console': isProd ? 'warn' : 'off',
      'no-debugger': isProd ? 'error' : 'off',

      // allow semicolons at the end of a statement
      '@stylistic/semi': 'off',

      // weaken some rules in development mode
      'no-unused-vars': isDev ? 'warn' : 'error',
      '@stylistic/no-multiple-empty-lines': isDev ? 'warn' : 'error',
      '@stylistic/space-before-blocks': isDev ? 'warn' : 'error',
      '@stylistic/space-before-function-paren': isDev ? 'warn' : 'error',
      '@stylistic/object-curly-spacing': isDev ? 'warn' : 'error',
      '@stylistic/indent': isDev ? 'warn' : 'error',
      '@stylistic/comma-dangle': isDev ? 'warn' : 'error',
      '@stylistic/comma-spacing': isDev ? 'warn' : 'error',
      '@stylistic/quotes': isDev ? 'warn' : 'error',
      '@stylistic/padded-blocks': isDev ? 'warn' : 'error',
      '@stylistic/keyword-spacing': isDev ? 'warn' : 'error',
      '@stylistic/arrow-spacing': isDev ? 'warn' : 'error'
    }
  },

  {
    // Test file overrides
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.mocha,
        ...globals.chai,
        sinon: 'readonly'
      }
    },
    rules: {
      'no-unused-expressions': 'off'
    }
  },

  {
    // Test file overrides
    files: [
      '**/ui-tests/tests/**/*.test.{j,t}s?(x)',
      '**/ui-tests/utils/**/*.{j,t}s?(x)'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.mocha,
        ...globals.chai,
        sinon: 'readonly',
        beforeAll: 'readonly'
      }
    },
    rules: {
      'no-unused-expressions': 'off'
    }
  }
]);
