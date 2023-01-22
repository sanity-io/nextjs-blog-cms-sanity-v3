import { createClient } from './createClient';
import { createConnect } from './createConnect';
import { timeoutFirstWith } from './operators';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { throwError, fromEvent, of } from 'rxjs';
var id = function (arg) { return arg; };
export { ERROR_CODES } from './errorCodes';
export function fromUrl(url, options) {
    if (options === void 0) { options = {}; }
    var timeout = options.timeout, token$ = options.token$;
    var connect = createConnect(function (url, protocols) {
        return new window.WebSocket(url, protocols);
    });
    return createClient(connect(url).pipe(timeout
        ? timeoutFirstWith(timeout, throwError(function () {
            return new Error("Timeout after ".concat(timeout, " while establishing WebSockets connection"));
        }))
        : id, shareReplay({ refCount: true }), takeUntil(fromEvent(window, 'beforeunload'))), { token$: token$ });
}
export function fromSanityClient(client) {
    var _a = client.config(), dataset = _a.dataset, token = _a.token;
    return fromUrl(client.getUrl("/socket/".concat(dataset)).replace(/^http/, 'ws'), token ? { token$: of(token) } : {});
}
