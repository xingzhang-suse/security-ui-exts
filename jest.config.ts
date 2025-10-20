import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  setupFilesAfterEnv:     ['./jest.setup.ts'],
  testEnvironment:        'jest-environment-jsdom',
  testEnvironmentOptions: { customExportConditions: ['node', 'node-addons'] },
  modulePaths:            ['<rootDir>'],
  moduleFileExtensions:   ['js', 'json', 'vue', 'ts', 'tsx'],
  moduleNameMapper:       {
    '^~/(.*)$':    '<rootDir>/$1',
    '^~~/(.*)$':   '<rootDir>/$1',
    '^@/(.*)$':    '<rootDir>/$1',
    '@shell/(.*)': '<rootDir>/node_modules/@rancher/shell/$1',
    '@components/(.*)':
      '<rootDir>/node_modules/@rancher/components/dist/@rancher/components.common.js',
    '@pkg/(.*)': '<rootDir>/pkg/sbomscanner/$1',
    '@network/(.*)': '<rootDir>/pkg/network/$1',
    '@runtime-process-profile/(.*)': '<rootDir>/pkg/runtime-process-profile/$1',
    '@tests/(.*)':      '<rootDir>/tests/$1',
  },
  transform: {
    '^.+\\.js$':   '<rootDir>/node_modules/babel-jest',
    '.*\\.vue$':   '<rootDir>/node_modules/@vue/vue3-jest',
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
    // '^.+\\.svg$':  '<rootDir>/tests/unit/config/svgTransform.ts' // to mock `*.svg` files
  },
  transformIgnorePatterns:  ['/node_modules/(?!(@vue|@rancher|jsonpath-plus))'],
  modulePathIgnorePatterns: [
    '<rootDir>/scripts/',
    '<rootDir>/assets/',
    '<rootDir>/charts/',
    '<rootDir>/extensions/',
  ],
  coverageDirectory: '<rootDir>/coverage/unit',
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  // coverageReporters: ['json', 'text-summary'],
  coverageProvider:  'v8',
  preset:            'ts-jest',
};

export default config;
