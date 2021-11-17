module.exports = {
    roots: ['<rootDir>/app/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
    ],
    testEnvironment: 'jsdom',
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // verbose: true,
    // collectCoverage: true,
    // collectCoverageFrom: ['<rootDir>/src/app/**/*.ts']
}