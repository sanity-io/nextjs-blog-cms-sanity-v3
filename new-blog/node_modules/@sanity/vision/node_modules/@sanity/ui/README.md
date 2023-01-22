# @sanity/ui

The Sanity UI components.

```sh
npm install @sanity/ui

# Install peer dependencies
npm install react react-dom react-is styled-components
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui)

## Usage

```jsx
import {Button, ThemeProvider, studioTheme} from '@sanity/ui'
import {createRoot} from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={studioTheme}>
    <Button text="Hello, world" />
  </ThemeProvider>
)
```

## License

MIT-licensed. See LICENSE.
