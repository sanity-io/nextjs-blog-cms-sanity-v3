var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { distinctUntilChanged, filter, finalize, map, mapTo, mergeMap, share, shareReplay, switchMap, take, } from 'rxjs/operators';
import { combineLatest, defer, EMPTY, fromEvent, merge, of, partition, } from 'rxjs';
import { customAlphabet } from 'nanoid';
import { SUBSCRIBE_METHODS } from './methods';
// at 1000 IDs per second ~4 million years needed in order to have a 1% probability of at least one collision.
// => https://zelark.github.io/nano-id-cc/
var defaultGetNextRequestId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-', 20);
var HEARTBEAT = '♥';
function formatRequest(method, params, id) {
    return JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: addApiVersion(params, 'v1'),
        id: id,
    });
}
function tryParse(input) {
    try {
        return [null, JSON.parse(input)];
    }
    catch (error) {
        return error instanceof Error ? [error] : [new Error("".concat(error))];
    }
}
function addApiVersion(params, v) {
    return __assign(__assign({}, params), { apiVersion: v });
}
export var createClient = function (connection$, options) {
    if (options === void 0) { options = {}; }
    var token$ = options.token$, _a = options.getNextRequestId, getNextRequestId = _a === void 0 ? defaultGetNextRequestId : _a;
    var _b = partition(connection$.pipe(switchMap(function (connection) { return fromEvent(connection, 'message'); })), function (event) { return event.data === HEARTBEAT; }), heartbeats$ = _b[0], responses$ = _b[1];
    var parsedResponses$ = responses$.pipe(mergeMap(function (response) {
        var _a = tryParse(response.data), err = _a[0], msg = _a[1];
        if (err) {
            console.warn('Unable to parse message: %s', err.message);
            return EMPTY;
        }
        if (!msg || !msg.jsonrpc) {
            console.warn('Received empty or non-jsonrpc message: %s', msg);
            return EMPTY;
        }
        return of(msg);
    }), share());
    var authedConnection$ = token$
        ? combineLatest([token$, connection$]).pipe(distinctUntilChanged(function (_a, _b) {
            var oldToken = _a[0], oldSocket = _a[1];
            var newToken = _b[0], newSocket = _b[1];
            return oldToken === newToken && oldSocket === newSocket;
        }), switchMap(function (_a) {
            var token = _a[0], ws = _a[1];
            return token
                ? call(ws, 'authorization', {
                    authorization: "Bearer ".concat(token),
                }).pipe(take(1), mapTo(ws))
                : of(ws);
        }), shareReplay({ refCount: true, bufferSize: 1 }))
        : connection$;
    function call(ws, method, params) {
        if (params === void 0) { params = {}; }
        var requestId = getNextRequestId();
        return merge(parsedResponses$.pipe(filter(function (rpcResult) { return rpcResult.id === requestId; }), map(function (rpcResult) { return rpcResult.result; })), defer(function () {
            ws.send(formatRequest(method, params, requestId));
            return EMPTY;
        }));
    }
    // Will call the rpc method and return an observable that emits the first reply and then ends
    function requestMethod(method, params) {
        return authedConnection$.pipe(take(1), mergeMap(function (ws) { return call(ws, method, params).pipe(take(1)); }));
    }
    // Will call the rpc method with the '_subscribe' suffix and return an observable of all received messages and
    // keeps the subscription open forever/until unsubscribe
    function requestSubscribe(method, params) {
        return authedConnection$.pipe(take(1), mergeMap(function (ws) {
            return call(ws, "".concat(method, "_subscribe"), params).pipe(take(1), mergeMap(function (subscriptionId) {
                return parsedResponses$.pipe(filter(function (message) {
                    return message.method === "".concat(method, "_subscription") &&
                        message.params.subscription === subscriptionId;
                }), map(function (message) { return message.params.result; }), finalize(function () {
                    if (ws.readyState !== ws.CLOSED &&
                        ws.readyState !== ws.CLOSING) {
                        ws.send(formatRequest("".concat(method, "_unsubscribe"), { subscriptionId: subscriptionId }, getNextRequestId()));
                    }
                }));
            }));
        }));
    }
    return {
        // heartbeat$ is a stream of date objects representing when the "last message was received"
        // it will keep the connection open until it is unsubscribed and can therefore be used to keep connection alive
        // between requests
        heartbeats: merge(authedConnection$, heartbeats$, responses$).pipe(map(function () { return new Date(); })),
        request: function (method, params) {
            return isSubscribeMethod(method)
                ? requestSubscribe(method, params)
                : requestMethod(method, params);
        },
    };
};
function isSubscribeMethod(method) {
    return SUBSCRIBE_METHODS.includes(method);
}
