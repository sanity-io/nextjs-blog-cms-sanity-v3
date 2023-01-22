// Strict ESM env, designed to run outside Node.js in envs that provide WebCrypto (deno, browsers, etc)

export default function getRandomValues(typedArray) {
  return window.crypto.getRandomValues(typedArray)
}
