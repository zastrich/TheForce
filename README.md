# TheForce Hand Tracking Library

A comprehensive hand tracking library built on MediaPipe, providing seamless integration with major JavaScript frameworks.

## Features

- 👋 Real-time hand tracking using MediaPipe
- 🎯 High accuracy and performance
- 🔌 Framework integrations for React, Vue, and Angular
- 🎨 Easy-to-use API
- 📦 Modular package structure
- 🎮 Framework-specific hooks and utilities
- 🖱️ Virtual mouse cursor functionality
- ⌛ Configurable hover-to-click actions
- 🧪 Extensive testing coverage

## Installation

Choose the package(s) that best suit your needs:

```bash
# Core package - required
npm install @theforce/core

# Framework specific packages
npm install @theforce/react    # For React applications
npm install @theforce/vue      # For Vue applications
npm install @theforce/angular  # For Angular applications
```

## Quick Start

### Core Package

```javascript
import { HandTracker } from '@theforce/core';

// Initialize the hand tracker
const tracker = new HandTracker({
  hoverDelay: 2000,
  cursorImageUrl: '/custom-cursor.png'
});

// Start tracking
await tracker.initialize();
await tracker.start(videoElement);

// Listen for hand tracking results
tracker.onResults((results) => {
  const { multiHandLandmarks } = results;
  // Process hand landmarks
});
```

### React Integration

```jsx
import { HandTrackerProvider, useHandTracker } from '@theforce/react';

function App() {
  return (
    <HandTrackerProvider>
      <HandTrackingComponent />
    </HandTrackerProvider>
  );
}

function HandTrackingComponent() {
  const videoRef = useRef(null);
  const { handLandmarks, initialize, isTracking } = useHandTracker();

  useEffect(() => {
    if (videoRef.current) {
      initialize(videoRef.current);
    }
  }, [initialize]);

  return (
    <div>
      <video ref={videoRef} />
      <div data-hoverable>Hover with your hand!</div>
    </div>
  );
}
```

### Vue Integration

```vue
<script setup>
import { useHandTracker, Hoverable } from '@theforce/vue';

const videoRef = ref(null);
const { handLandmarks, initialize, isTracking } = useHandTracker();

onMounted(async () => {
  if (videoRef.value) {
    await initialize(videoRef.value);
  }
});
</script>

<template>
  <div>
    <video ref="videoRef" />
    <Hoverable>Hover with your hand!</Hoverable>
  </div>
</template>
```

### Angular Integration

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { HandTrackerModule } from '@theforce/angular';

@NgModule({
  imports: [HandTrackerModule],
})
export class AppModule { }

// app.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HandTrackerService } from '@theforce/angular';

@Component({
  selector: 'app-hand-tracking',
  template: `
    <div>
      <video #video></video>
      <div data-hoverable>Hover with your hand!</div>
    </div>
  `
})
export class HandTrackingComponent {
  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement>;

  constructor(private handTracker: HandTrackerService) {
    this.handTracker.handLandmarks$.subscribe(landmarks => {
      // Process hand landmarks
    });
  }

  async ngAfterViewInit() {
    await this.handTracker.start(this.videoElement.nativeElement);
  }
}
```

## Examples

Check out the working examples in the `examples/` directory:

- **Vanilla JS Example**: `examples/core/` - Vanilla JavaScript implementation
- **React Example**: `examples/react/` - React hooks and context
- **Vue Example**: `examples/vue/` - Vue 3 composables
- **Angular Example**: `examples/angular/` - Angular services

### Running Examples

```bash
# Core example (open index.html in browser)
cd examples/core
# Open index.html in your browser

# React example
cd examples/react
npm install
npm run dev

# Vue example
cd examples/vue
npm install
npm run dev

# Angular example
cd examples/angular
npm install
npm start
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hoverDelay` | number | 2000 | Time in milliseconds to hover before triggering click |
| `cursorImageUrl` | string | - | URL for custom cursor image |
| `actionImageUrl` | string | - | URL for action indicator image |

## CSS Classes

The library adds the following CSS classes that you can style:

- `.force-hoverable`: Added to elements that can be interacted with
- `.force-hover`: Added to elements while being hovered over

## Browser Support

This library requires browsers that support:
- WebRTC (for camera access)
- MediaPipe
- Modern JavaScript features

**Minimum browser versions:**
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

This is a monorepo using Turborepo for build orchestration.

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Start development mode
npm run dev

# Clean build artifacts
npm run clean
```

## Project Structure

```
theforce/
├── packages/
│   ├── core/         # Core hand tracking functionality
│   ├── react/        # React integration
│   ├── vue/          # Vue integration
│   ├── angular/      # Angular integration
│   ├── tsconfig/     # Shared TypeScript configuration
│   └── jest-config/  # Shared Jest configuration
├── examples/         # Working examples for all frameworks
│   ├── core/         # Vanilla JS example
│   ├── react/        # React example
│   ├── vue/          # Vue example
│   └── angular/      # Angular example
└── [configuration files]
```

## Testing

The library includes comprehensive test coverage using Jest:

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=@theforce/core
npm test --workspace=@theforce/react
npm test --workspace=@theforce/vue
npm test --workspace=@theforce/angular
```

### Test Coverage Results

- **Core**: 12/12 tests passing ✅
- **Vue**: 4/4 tests passing ✅
- **Angular**: 3/3 tests passing ✅
- **React**: 4/4 tests passing ✅

## Contributing

We welcome contributions! Here's how you can help:

### Setting Up Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/TheForce.git
   cd TheForce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Write tests for new functionality
- Keep commits atomic and well-described

### Running Examples Locally

To test your changes with the examples:

```bash
# Build the packages first
npm run build

# Test React example
cd examples/react
npm install
npm run dev

# Test Vue example
cd examples/vue
npm install
npm run dev

# Test Angular example
cd examples/angular
npm install
npm start
```

## Open Source Guidelines

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our approachability and openness.

### Reporting Issues

Before reporting an issue, please:

1. Check if the issue has already been reported
2. Try the latest version of the library
3. Provide a minimal reproduction case
4. Include browser and OS information

### Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Provide a clear description of the feature
3. Explain the use case and benefits
4. Consider contributing the implementation

### Security

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. Email us at [security@theforce.dev](mailto:security@theforce.dev)
3. We will respond within 48 hours

## Support

- 📖 [Documentation](https://theforce.dev/docs)
- 🐛 [Issue Tracker](https://github.com/zastrich/TheForce/issues)
- 💬 [Discussions](https://github.com/zastrich/TheForce/discussions)
- 📧 [Email Support](mailto:support@theforce.dev)

## Acknowledgments

- [MediaPipe](https://mediapipe.dev/) for the hand tracking technology
- [Turborepo](https://turborepo.org/) for the monorepo tooling
- All our contributors and supporters

## License

MIT License © [Zastrich](https://github.com/zastrich)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
