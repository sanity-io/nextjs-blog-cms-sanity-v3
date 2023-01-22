var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Observable } from 'rxjs';
var WebSocketError = /** @class */ (function (_super) {
    __extends(WebSocketError, _super);
    function WebSocketError(message, type, code, reason) {
        var _this = _super.call(this, message) || this;
        _this.type = type;
        _this.code = code;
        _this.reason = reason;
        return _this;
    }
    return WebSocketError;
}(Error));
export { WebSocketError };
export function createConnect(getWebsocketInstance) {
    return function (url) {
        return new Observable(function (subscriber) {
            var ws = getWebsocketInstance(url);
            var didUnsubscribe = false;
            var onOpen = function () {
                subscriber.next(ws);
            };
            var onError = function () {
                subscriber.error(new WebSocketError('WebSocket connection error', 'CONNECTION_ERROR'));
            };
            var onClose = function (ev) {
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
            return function () {
                didUnsubscribe = true;
                ws.close(1000, 'WebSockets connection closed by client');
            };
        });
    };
}
