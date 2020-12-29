module.exports = {
    root: true,
    extends: ['@souche-vue3/formatter'],
    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        'vue/max-attributes-per-line': 'off',
        '@typescript-eslint/no-use-before-define': 1,
        '@typescript-eslint/no-empty-function': 1,
    },
    plugins: ['markdown'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
