import { Observable } from 'rxjs';
export class WebSocketError extends Error {
    constructor(message, type, code, reason) {
        super(message);
        this.type = type;
        this.code = code;
        this.reason = reason;
    }
}
export function createConnect(getWebsocketInstance) {
    return (url) => {
        return new Observable(subscriber => {
            const ws = getWebsocketInstance(url);
            let didUnsubscribe = false;
            const onOpen = () => {
                subscriber.next(ws);
            };
            const onError = () => {
                subscriber.error(new WebSocketError('WebSocket connection error', 'CONNECTION_ERROR'));
            };
            const onClose = ev => {
                if (!didUnsubscribe) {
                    subscriber.error(new WebSocketError('WebSocket connection error', 'CONNECTION_CLOSED', ev.code, ev.reason));
                }
                else {
                    subscriber.complete();
                }
            };
            ws.onopen = onOpen;
            ws.onclose = onClose;
            ws.onerror = onError;
            return () => {
                didUnsubscribe = true;
                ws.close(1000, 'WebSockets connection closed by client');
            };
        });
    };
}
