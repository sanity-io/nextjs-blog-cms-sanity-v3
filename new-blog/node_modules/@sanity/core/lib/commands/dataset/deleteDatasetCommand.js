"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _yargs = _interopRequireDefault(require("yargs/yargs"));
var _helpers = require("yargs/helpers");
var _validateDatasetName = _interopRequireDefault(require("../../actions/dataset/validateDatasetName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const helpText = `
Options
  --force Do not prompt for delete confirmation - forcefully delete

Examples
  sanity dataset delete
  sanity dataset delete my-dataset
  sanity dataset delete my-dataset --force
`;
function parseCliFlags(args) {
  return (0, _yargs.default)((0, _helpers.hideBin)(args.argv || process.argv).slice(2)).option('force', {
    type: 'boolean'
  }).argv;
}
var _default = {
  name: 'delete',
  group: 'dataset',
  helpText,
  signature: '[datasetName]',
  description: 'Delete a dataset within your project',
  action: async (args, context) => {
    const {
      apiClient,
      prompt,
      output
    } = context;
    const {
      force
    } = parseCliFlags(args);
    const [ds] = args.argsWithoutOptions;
    if (!ds) {
      throw new Error('Dataset name must be provided');
    }
    const dataset = `${ds}`;
    const dsError = (0, _validateDatasetName.default)(dataset);
    if (dsError) {
      throw dsError;
    }
    if (force) {
      output.warn(`'--force' used: skipping confirmation, deleting dataset "${dataset}"`);
    } else {
      await prompt.single({
        type: 'input',
        message: 'Are you ABSOLUTELY sure you want to delete this dataset?\n  Type the name of the dataset to confirm delete:',
        filter: input => `${input}`.trim(),
        validate: input => {
          return input === dataset || 'Incorrect dataset name. Ctrl + C to cancel delete.';
        }
      });
    }
    await apiClient().datasets.delete(dataset);
    output.print('Dataset deleted successfully');
  }
};
exports.default = _default;