"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _opn = _interopRequireDefault(require("opn"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  name: 'create',
  group: 'hook',
  signature: '',
  description: 'Create a new hook for the given dataset',
  action: async (args, context) => {
    const {
      apiClient,
      output
    } = context;
    const client = apiClient();
    const {
      projectId
    } = client.config();
    const projectInfo = (await client.projects.getById(projectId)) || {};
    const organizationId = projectInfo.organizationId || 'personal';
    const manageUrl = `https://www.sanity.io/organizations/${organizationId}/project/${projectId}/api/webhooks/new`;
    output.print(`Opening ${manageUrl}`);
    (0, _opn.default)(manageUrl, {
      wait: false
    });
  }
};
exports.default = _default;