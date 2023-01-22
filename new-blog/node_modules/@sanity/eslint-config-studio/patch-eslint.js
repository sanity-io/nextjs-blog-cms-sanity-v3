const fs = require('fs');
const path = require('path');

// this is to meant to patch the pack of export map support in jest-resolve.
// without this patch, an error occurs inside of jest when
// `@typescript-eslint/parser` tries to require `eslint/use-at-your-own-risk`
// https://github.com/facebook/jest/issues/9771
try {
  fs.writeFileSync(
    path.resolve(__dirname, './node_modules/eslint/use-at-your-own-risk.js'),
    "module.exports = require('./lib/unsupported-api.js')",
  );
} catch {
  // intentionally blank
}
