module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'next.config.js'],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'react/jsx-no-constructed-context-values': 'off',
    'react/function-component-definition': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/member-delimiter-style': ['warn', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    }],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'sort-imports': ['warn', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      allowSeparatedGroups: false,
    }],
    'import/order': ['warn', {
      alphabetize: { order: 'asc', orderImportKind: 'asc', caseInsensitive: true },
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['react'],
      warnOnUnassignedImports: true,
      groups: ['builtin', 'external', 'internal'],
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        ...['shared'].map((name) => ([
          { pattern: `${name}`, group: 'internal' },
          { pattern: `${name}/**`, group: 'internal' },
        ])),
      ].flat(),
    }],
    'react-hooks/exhaustive-deps': 'off',
  },
};
