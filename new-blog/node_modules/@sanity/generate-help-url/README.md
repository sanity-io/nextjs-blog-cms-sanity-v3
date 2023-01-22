# @sanity/generate-help-url

[![npm version](https://img.shields.io/npm/v/@sanity/generate-help-url.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/generate-help-url)[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@sanity/generate-help-url?style=flat-square)](https://bundlephobia.com/result?p=@sanity/generate-help-url)[![Build Status](https://img.shields.io/github/workflow/status/sanity-io/generate-help-url/test/main.svg?style=flat-square)](https://github.com/sanity-io/generate-help-url/actions?query=workflow%3Atest)

Generates URLs to specific sections of the Sanity documentation.

## Installation

```
npm install --save @sanity/generate-help-url
```

## Usage

```ts
import {generateHelpUrl} from '@sanity/generate-help-url'

console.log(generateHelpUrl('form-builder-input-missing-required-prop'))
```

The above example generates a help URL that points to a help document with the id `form-builder-input-missing-required-prop`.

## License

MIT © [Sanity.io](https://www.sanity.io/)
