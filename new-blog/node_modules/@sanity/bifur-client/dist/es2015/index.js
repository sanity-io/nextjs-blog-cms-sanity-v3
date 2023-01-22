import { createClient } from './createClient';
import { createConnect } from './createConnect';
import { timeoutFirstWith } from './operators';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { throwError, fromEvent, of } from 'rxjs';
const id = (arg) => arg;
export { ERROR_CODES } from './errorCodes';
export function fromUrl(url, options = {}) {
    const { timeout, token$ } = options;
    const connect = createConnect((url, protocols) => new window.WebSocket(url, protocols));
    return createClient(connect(url).pipe(timeout
        ? timeoutFirstWith(timeout, throwError(() => new Error(`Timeout after ${timeout} while establishing WebSockets connection`)))
        : id, shareReplay({ refCount: true }), takeUntil(fromEvent(window, 'beforeunload'))), { token$ });
}
export function fromSanityClient(client) {
    const { dataset, token } = client.config();
    return fromUrl(client.getUrl(`/socket/${dataset}`).replace(/^http/, 'ws'), token ? { token$: of(token) } : {});
}
