module.exports = {
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/file-mock.js',
    '\\.svg': '<rootDir>/jest/__mocks__/svgr-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/jest/setup-test-env.js'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment'
}
