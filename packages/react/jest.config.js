module.exports = {
  preset: '../jest-config/jest-preset.js',
  displayName: 'react',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}; 