# @theforce/tsconfig

This package provides shared TypeScript configurations for the TheForce monorepo. It centralizes common TypeScript settings, ensuring consistency and reducing duplication across all packages.

## Installation

```bash
npm install @theforce/tsconfig
# or
yarn add @theforce/tsconfig
```

## Usage

To use these shared configurations in your project's `tsconfig.json`, extend from the appropriate base configuration. There are typically two main configurations:

-   `base.json`: For general TypeScript projects.
-   `react-library.json` (example): For React-specific libraries.

### Example: Using `base.json`

```json
// tsconfig.json in your package (e.g., packages/core/tsconfig.json)
{
  "extends": "@theforce/tsconfig/base.json",
  "compilerOptions": {
    // Add any package-specific compiler options here
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### Example: Using a framework-specific configuration (if available)

If there were a `react-library.json`:

```json
// tsconfig.json in your React package (e.g., packages/react/tsconfig.json)
{
  "extends": "@theforce/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

## Available Configurations

-   `base.json`: A foundational TypeScript configuration with common settings suitable for most projects within the monorepo.

## Benefits

-   **Consistency**: Ensures all packages use the same fundamental TypeScript settings.
-   **Maintainability**: Changes to core TypeScript rules can be made in one place.
-   **Reduced Duplication**: Avoids repeating `compilerOptions` in every `tsconfig.json`.
