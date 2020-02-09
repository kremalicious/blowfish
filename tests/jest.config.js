module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/file-mock.js',
    '\\.svg': '<rootDir>/tests/__mocks__/svgr-mock.js'
  },
  testMatch: ['**/?(*.)+(spec|test).jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/src/renderer/.next',
    '<rootDir>/src/renderer/out',
    '<rootDir>/node_modules',
    '<rootDir>/build',
    '<rootDir>/dist',
    '<rootDir>/coverage'
  ],
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
  coverageDirectory: '../../coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/renderer/**/*.jsx',
    '!<rootDir>/dist',
    '!**/node_modules/**'
  ]
}
