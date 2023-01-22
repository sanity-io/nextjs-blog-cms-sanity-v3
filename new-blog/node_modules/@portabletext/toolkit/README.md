# @portabletext/toolkit

[![npm version](https://img.shields.io/npm/v/@portabletext/toolkit.svg?style=flat-square)](https://www.npmjs.com/package/@portabletext/toolkit)[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@portabletext/toolkit?style=flat-square)](https://bundlephobia.com/result?p=@portabletext/toolkit)[![Build Status](https://img.shields.io/github/workflow/status/portabletext/toolkit/test/main.svg?style=flat-square)](https://github.com/portabletext/toolkit/actions?query=workflow%3Atest)

Javascript toolkit of handy utility functions for dealing with Portable Text.

Particularly useful for building rendering libraries for Portable Text that outputs HTML.

## Installation

```
npm install --save @portabletext/toolkit
```

## Documentation

See [https://portabletext.github.io/toolkit/](https://portabletext.github.io/toolkit/)

## Usage

```ts
import {toPlainText} from '@portabletext/toolkit'

console.log(toPlainText(myPortableTextBlocks))
```

## License

MIT © [Sanity.io](https://www.sanity.io/)
