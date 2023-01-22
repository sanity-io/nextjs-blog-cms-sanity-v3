/**
 * Browser-safe usage of process
 */
var mockProcess = { env: { NODE_ENV: "production" } };
var safeProcess = typeof process === "undefined" ? mockProcess : process;
// eslint-disable-next-line import/no-default-export
var process$1 = safeProcess;

export { process$1 as default };
