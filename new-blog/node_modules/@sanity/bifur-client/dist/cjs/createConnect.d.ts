import { Observable } from 'rxjs';
export interface WebSocket {
    onclose: ((this: this, ev: CloseEvent) => any) | null;
    onerror: ((this: this, ev: any) => any) | null;
    onmessage: ((this: this, ev: MessageEvent) => any) | null;
    onopen: ((this: this, ev: any) => any) | null;
    close(code?: number, reason?: string): void;
}
declare type ErrorType = 'CONNECTION_ERROR' | 'CONNECTION_CLOSED';
export declare class WebSocketError extends Error {
    type: ErrorType;
    code: number | undefined;
    reason: string | undefined;
    constructor(message: string, type: ErrorType, code?: number, reason?: string);
}
export declare function createConnect<T extends WebSocket>(getWebsocketInstance: (url: string, protocols?: string | string[]) => T): (url: string) => Observable<T>;
export {};
