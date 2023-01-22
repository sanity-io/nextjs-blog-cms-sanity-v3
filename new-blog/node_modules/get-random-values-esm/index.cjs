const { webcrypto } = require('crypto')

// node v15 and later adds support for WebCrypto, so we load it using a conditional export that is only supported by v14 and later
module.exports =
  typeof webcrypto === 'undefined'
    ? require('get-random-values')
    : function getRandomValues(typedArray) {
        return webcrypto.getRandomValues(typedArray)
      }
