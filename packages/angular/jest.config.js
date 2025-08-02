module.exports = {
  preset: '../jest-config/jest-preset.js',
  displayName: 'angular',
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@theforce)/)',
  ],
}; 