module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // 'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        // 'eslint-plugin-jsx-a11y',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'jest', 'jsx-a11y', 'prettier'],
    rules: {
        'prettier/prettier': [
            //or whatever plugin that is causing the clash
            'error',
            {
                tabWidth: 4,
                singleQuote: true,
            },
        ],
        'max-len': ['error', { code: 120 }],
        'no-unused-vars': 'off',
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': ['error'],
        'arrow-parens': ['error', 'always'],
        'comma-dangle': ['off', 'always-multiline'],
        'consistent-return': ['off'],
        curly: ['error', 'multi-line', 'consistent'],
        'func-names': ['error'],
        'function-paren-newline': ['off'],
        'import/prefer-default-export': ['off'],
        'linebreak-style': ['off'],
        'no-alert': ['error'],
        'no-cond-assign': ['error', 'except-parens'],
        'no-constant-condition': ['error'],
        // 'no-console': ['error'],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
        'no-param-reassign': ['error', { props: false }],
        'no-plusplus': ['off'],
        'no-return-assign': ['error', 'except-parens'],
        'no-use-before-define': ['off'],
        'no-var': ['off'],
        'no-void': ['off'], // ['error', { allowAsStatement: true }],
        'operator-linebreak': ['error', 'after', { overrides: { '?': 'ignore', ':': 'ignore' } }],
        'prefer-destructuring': ['error', { object: true, array: false }],
        'prefer-template': ['off'],
        'vars-on-top': ['off'],
        'lines-between-class-members': ['off'],
        'no-else-return': ['error', { allowElseIf: true }],
        'class-methods-use-this': 'off',
        'no-restricted-exports': 'off',
        'prefer-regex-literals': 'off',
        'prefer-exponentiation-operator': 'off',
        'default-param-last': 'off',
        'no-promise-executor-return': 'off',

        camelcase: [
            'error',
            {
                properties: 'always',
                ignoreDestructuring: false,
                allow: ['^UNSAFE_'],
            },
        ],

        'import/default': ['off'],
        'import/first': ['off'],
        'sort-imports': [
            'error',
            {
                allowSeparatedGroups: true,
                ignoreCase: true,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        'import/no-named-as-default': ['off'],
        'import/no-named-as-default-member': ['off'],
        'import/extensions': ['off'],

        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                specialLink: ['as', 'route'],
            },
        ],
        'jsx-a11y/anchor-has-content': ['warn'],
        'jsx-a11y/click-events-have-key-events': ['warn'],
        'jsx-a11y/no-static-element-interactions': ['warn'],

        'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: true }],
        'react/jsx-handler-names': ['error', { eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on' }],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-curly-spacing': ['error', 'never'],
        'react/no-danger': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/no-typos': ['off'],
        'react/prefer-es6-class': ['error', 'always'],
        'react/prefer-stateless-function': ['off'],
        'react/prop-types': 'off',
        'react/require-default-props': ['off'],
        'react/sort-comp': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react/destructuring-assignment': ['off'],
        'react/state-in-constructor': ['off'],
        'react/jsx-fragments': ['off'],
        'react/static-property-placement': ['off'],
        'react/forbid-prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-curly-brace-presence': ['error', 'ignore'],
        'react/function-component-definition': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-unused-class-component-methods': 'off',
        'react/jsx-no-constructed-context-values': 'warn',
        'react/no-unstable-nested-components': 'warn',
        'react/no-arrow-function-lifecycle': 'off',
        'react/no-this-in-sfc': 'off',
        'react/jsx-no-bind': 'off',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
};
