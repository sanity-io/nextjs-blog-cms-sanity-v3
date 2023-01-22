import { Observable } from 'rxjs';
import { BifurClient } from './types';
export interface BifurClientOptions {
    token$?: Observable<string | null>;
    getNextRequestId?: () => string;
}
export declare const createClient: (connection$: Observable<WebSocket>, options?: BifurClientOptions) => BifurClient;
