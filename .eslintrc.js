module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        semi: 'off', // Turn it off to avoid conflict, prettier/prettier already covers 'semi'
        'prettier/prettier': ['error'],
        '@typescript-eslint/explicit-member-accessibility': [
            2,
            {
                accessibility: 'explicit',
                overrides: {
                    constructors: 'no-public'
                }
            }
        ],
        '@typescript-eslint/no-parameter-properties': 'off',
        quotes: [
            2,
            'single',
            {
                allowTemplateLiterals: true
            }
        ],
        'no-var': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-inferrable-types': [
            2,
            {
                ignoreParameters: true
            }
        ]
    }
};
