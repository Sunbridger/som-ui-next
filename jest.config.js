const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    // 该方法在 jest@23.x 中使用 若升级至 24.x 请使用 setupFilesAfterEnv
    setupTestFrameworkScriptFile: './tests/unit/setup.js',

    coverageDirectory: resolve('./tests/unit/report'),

    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },

    transformIgnorePatterns: [
        '/node_modules/'
    ],

    moduleNameMapper: {
        '^root/(.*)$': '<rootDir>/$1',
        '^main/(.*)$': '<rootDir>/src/$1'
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testURL: 'http://localhost/',
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
};
