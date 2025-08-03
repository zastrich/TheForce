# @theforce/jest-config

This package provides a shared Jest preset configuration for the TheForce monorepo. It centralizes common Jest settings, making it easier to maintain consistent testing environments across all packages within the monorepo.

## Installation

```bash
npm install @theforce/jest-config
# or
yarn add @theforce/jest-config
```

## Usage

To use this shared Jest preset in your project's `jest.config.js` (or `jest.config.ts`), simply reference it in the `preset` field:

```javascript
// jest.config.js in your package (e.g., packages/react/jest.config.js)

module.exports = {
  // Extend the shared preset
  preset: '@theforce/jest-config',
  
  // Add any package-specific configurations here
  // For example, if you need to transform specific files:
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },
  
  // Or if you have specific test environment setup files:
  // setupFilesAfterEnv: ['./src/setupTests.ts'],
};
```

## What's Included in the Preset

This preset typically includes configurations for:

- TypeScript support (via `ts-jest`)
- Module name mapping (for path aliases)
- Test environment (e.g., `jsdom` for browser-like environments)
- Coverage collection settings
- Other common Jest options

By using this preset, you ensure that all packages adhere to a consistent testing standard without duplicating configurations.
