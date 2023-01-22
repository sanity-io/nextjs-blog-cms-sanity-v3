"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromSanityClient = exports.fromUrl = exports.ERROR_CODES = void 0;
var createClient_1 = require("./createClient");
var createConnect_1 = require("./createConnect");
var operators_1 = require("./operators");
var operators_2 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var id = function (arg) { return arg; };
var errorCodes_1 = require("./errorCodes");
Object.defineProperty(exports, "ERROR_CODES", { enumerable: true, get: function () { return errorCodes_1.ERROR_CODES; } });
function fromUrl(url, options) {
    if (options === void 0) { options = {}; }
    var timeout = options.timeout, token$ = options.token$;
    var connect = (0, createConnect_1.createConnect)(function (url, protocols) {
        return new window.WebSocket(url, protocols);
    });
    return (0, createClient_1.createClient)(connect(url).pipe(timeout
        ? (0, operators_1.timeoutFirstWith)(timeout, (0, rxjs_1.throwError)(function () {
            return new Error("Timeout after ".concat(timeout, " while establishing WebSockets connection"));
        }))
        : id, (0, operators_2.shareReplay)({ refCount: true }), (0, operators_2.takeUntil)((0, rxjs_1.fromEvent)(window, 'beforeunload'))), { token$: token$ });
}
exports.fromUrl = fromUrl;
function fromSanityClient(client) {
    var _a = client.config(), dataset = _a.dataset, token = _a.token;
    return fromUrl(client.getUrl("/socket/".concat(dataset)).replace(/^http/, 'ws'), token ? { token$: (0, rxjs_1.of)(token) } : {});
}
exports.fromSanityClient = fromSanityClient;
