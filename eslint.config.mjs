import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  // 1. Globally ignore build outputs, reports, and dependencies
  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**']
  },
  
  // 2. Base rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Playwright & TypeScript test/page rules
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts'],
    ...playwright.configs['flat/recommended'],
  }
);