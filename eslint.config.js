import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['src/**/*.{js,ts}'], // Вкажіть файли, які потрібно перевіряти
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  {
    files: ['src/**/*.ts'], // Типові файли TypeScript
    languageOptions: {
      parser: tsParser,
    },
  },
];
