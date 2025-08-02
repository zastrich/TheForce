module.exports = {
  preset: '../jest-config/jest-preset.js',
  displayName: 'core',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}; 