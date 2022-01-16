// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const rootDirector = path.resolve(__dirname, '..');

module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.ts'],
    coveragePathIgnorePatterns: [`${rootDirector}/_tests_/`],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json'
        }
    },
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test API Report',
                outputPath: 'test-report.html'
            }
        ]
    ],
    testResultsProcessor: './node_modules/jest-html-reporter'
};
