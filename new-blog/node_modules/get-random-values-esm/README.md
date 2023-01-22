# get-random-values-esm

A wrapper that rebundles [`get-random-values`](https://www.npmjs.com/package/get-random-values) into ESM, so you can use it in your `vite`, `skypack`, or wherever you need ESM.
Also adds support for [node v15's WebCrypto support](https://nodejs.org/docs/latest-v15.x/api/webcrypto.html#webcrypto_crypto_getrandomvalues_typedarray) and TypeScript definitions.

## Install

```bash
$ npm install get-random-values-esm
```

## Usage

Same as [before](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#usage), but now with ESM imports:

```js
import getRandomValues from 'get-random-values-esm'

console.log(getRandomValues(new Uint8Array(16)))
```
