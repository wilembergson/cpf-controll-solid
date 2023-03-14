module.exports = {
  collectCoverageFrom: ['<rootDir>/src/core/**/*.ts', '!<rootDir>/src/core/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};