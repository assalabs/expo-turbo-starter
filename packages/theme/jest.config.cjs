module.exports = {
  preset: 'ts-jest',
  watchman: false,
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 50,
      lines: 100,
      statements: 100,
    },
  },
};
