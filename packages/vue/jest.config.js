module.exports = {
  preset: '../jest-config/jest-preset.js',
  displayName: 'vue',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}; 