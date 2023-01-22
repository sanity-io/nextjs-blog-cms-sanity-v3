import { distinctUntilChanged, filter, finalize, map, mapTo, mergeMap, share, shareReplay, switchMap, take, } from 'rxjs/operators';
import { combineLatest, defer, EMPTY, fromEvent, merge, of, partition, } from 'rxjs';
import { customAlphabet } from 'nanoid';
import { SUBSCRIBE_METHODS } from './methods';
// at 1000 IDs per second ~4 million years needed in order to have a 1% probability of at least one collision.
// => https://zelark.github.io/nano-id-cc/
const defaultGetNextRequestId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-', 20);
const HEARTBEAT = '♥';
function formatRequest(method, params, id) {
    return JSON.stringify({
        jsonrpc: '2.0',
        method,
        params: addApiVersion(params, 'v1'),
        id,
    });
}
function tryParse(input) {
    try {
        return [null, JSON.parse(input)];
    }
    catch (error) {
        return error instanceof Error ? [error] : [new Error(`${error}`)];
    }
}
function addApiVersion(params, v) {
    return Object.assign(Object.assign({}, params), { apiVersion: v });
}
export const createClient = (connection$, options = {}) => {
    const { token$, getNextRequestId = defaultGetNextRequestId } = options;
    const [heartbeats$, responses$] = partition(connection$.pipe(switchMap(connection => fromEvent(connection, 'message'))), event => event.data === HEARTBEAT);
    const parsedResponses$ = responses$.pipe(mergeMap(response => {
        const [err, msg] = tryParse(response.data);
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
    const authedConnection$ = token$
        ? combineLatest([token$, connection$]).pipe(distinctUntilChanged(([oldToken, oldSocket], [newToken, newSocket]) => oldToken === newToken && oldSocket === newSocket), switchMap(([token, ws]) => token
            ? call(ws, 'authorization', {
                authorization: `Bearer ${token}`,
            }).pipe(take(1), mapTo(ws))
            : of(ws)), shareReplay({ refCount: true, bufferSize: 1 }))
        : connection$;
    function call(ws, method, params = {}) {
        const requestId = getNextRequestId();
        return merge(parsedResponses$.pipe(filter(rpcResult => rpcResult.id === requestId), map((rpcResult) => rpcResult.result)), defer(() => {
            ws.send(formatRequest(method, params, requestId));
            return EMPTY;
        }));
    }
    // Will call the rpc method and return an observable that emits the first reply and then ends
    function requestMethod(method, params) {
        return authedConnection$.pipe(take(1), mergeMap(ws => call(ws, method, params).pipe(take(1))));
    }
    // Will call the rpc method with the '_subscribe' suffix and return an observable of all received messages and
    // keeps the subscription open forever/until unsubscribe
    function requestSubscribe(method, params) {
        return authedConnection$.pipe(take(1), mergeMap(ws => call(ws, `${method}_subscribe`, params).pipe(take(1), mergeMap(subscriptionId => parsedResponses$.pipe(filter(message => message.method === `${method}_subscription` &&
            message.params.subscription === subscriptionId), map(message => message.params.result), finalize(() => {
            if (ws.readyState !== ws.CLOSED &&
                ws.readyState !== ws.CLOSING) {
                ws.send(formatRequest(`${method}_unsubscribe`, { subscriptionId }, getNextRequestId()));
            }
        }))))));
    }
    return {
        // heartbeat$ is a stream of date objects representing when the "last message was received"
        // it will keep the connection open until it is unsubscribed and can therefore be used to keep connection alive
        // between requests
        heartbeats: merge(authedConnection$, heartbeats$, responses$).pipe(map(() => new Date())),
        request: (method, params) => isSubscribeMethod(method)
            ? requestSubscribe(method, params)
            : requestMethod(method, params),
    };
};
function isSubscribeMethod(method) {
    return SUBSCRIBE_METHODS.includes(method);
}
