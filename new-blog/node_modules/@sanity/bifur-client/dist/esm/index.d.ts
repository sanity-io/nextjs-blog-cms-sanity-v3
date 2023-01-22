import type { BifurClient, SanityClientLike } from './types';
import { Observable } from 'rxjs';
interface Options {
    timeout?: number;
    token$?: Observable<string | null>;
}
export { ERROR_CODES } from './errorCodes';
export { BifurClient };
export declare function fromUrl(url: string, options?: Options): BifurClient;
export declare function fromSanityClient(client: SanityClientLike): BifurClient;
