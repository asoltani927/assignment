const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  cacheDirectory: '.jest/cache',
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['src/**/*.ts?(x)'],
  coveragePathIgnorePatterns: ['src/main.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  testTimeout: 15000,
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
        tsconfig: './tsconfig.json',
      },
    ],
  },
};
