module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    testMatch: ['**/*.spec.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };