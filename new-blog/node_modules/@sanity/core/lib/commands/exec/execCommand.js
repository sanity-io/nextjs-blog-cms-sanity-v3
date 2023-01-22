"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lazyRequire = _interopRequireDefault(require("@sanity/util/lib/lazyRequire"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const helpText = `
Options
  --with-user-token Preload access token from CLI config into 'part:@sanity/base/client' part
  --mock-browser-env Mocks a browser-like environment using jsdom

Examples
  # Run the script at some/script.js in Sanity context
  sanity exec some/script.js

  # Run the script at migrations/fullname.js and configure \`part:@sanity/base/client\`
  # to include the current user's token
  sanity exec migrations/fullname.js --with-user-token
  
  # Run the script at scripts/browserScript.js in a mock browser environment
  sanity exec scripts/browserScript.js --mock-browser-env

  # Pass arbitrary arguments to scripts by separating them with a \`--\`.
  # Arguments are available in \`process.argv\` as they would in regular node scripts
  # eg the following command would yield a \`process.argv\` of:
  # ['/path/to/node', '/path/to/myscript.js', '--dry-run', 'positional-argument']
  sanity exec --mock-browser-env myscript.js -- --dry-run positional-argument
`;
var _default = {
  name: 'exec',
  signature: 'SCRIPT',
  description: 'Runs a script in Sanity context',
  helpText,
  action: (0, _lazyRequire.default)(require.resolve('../../actions/exec/execScript'))
};
exports.default = _default;