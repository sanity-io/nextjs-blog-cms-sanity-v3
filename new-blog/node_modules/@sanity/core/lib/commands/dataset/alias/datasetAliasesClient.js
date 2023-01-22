"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALIAS_PREFIX = void 0;
exports.createAlias = createAlias;
exports.listAliases = listAliases;
exports.modify = modify;
exports.removeAlias = removeAlias;
exports.unlinkAlias = unlinkAlias;
exports.updateAlias = updateAlias;
var _validateDatasetAliasName = _interopRequireDefault(require("../../../actions/dataset/alias/validateDatasetAliasName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ALIAS_PREFIX = '~';
exports.ALIAS_PREFIX = ALIAS_PREFIX;
function listAliases(client) {
  return client.request({
    uri: '/aliases'
  });
}
function createAlias(client, name, datasetName) {
  return modify(client, 'PUT', name, datasetName ? {
    datasetName
  } : null);
}
function modify(client, method, name, body) {
  return client.request({
    method,
    uri: `/aliases/${name}`,
    body
  });
}
function updateAlias(client, name, datasetName) {
  return modify(client, 'PATCH', name, datasetName ? {
    datasetName
  } : null);
}
function unlinkAlias(client, name) {
  (0, _validateDatasetAliasName.default)(name);
  return modify(client, 'PATCH', `${name}/unlink`, {}, true);
}
function removeAlias(client, name) {
  return modify(client, 'DELETE', name);
}