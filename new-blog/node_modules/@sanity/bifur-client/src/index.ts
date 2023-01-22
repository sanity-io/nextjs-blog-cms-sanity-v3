import type {BifurClient, SanityClientLike} from './types'
import {createClient} from './createClient'
import {createConnect} from './createConnect'
import {timeoutFirstWith} from './operators'
import {shareReplay, takeUntil} from 'rxjs/operators'
import {throwError, fromEvent, Observable, of} from 'rxjs'

interface Options {
  timeout?: number
  token$?: Observable<string | null>
}

const id = <T>(arg: T): T => arg

export {ERROR_CODES} from './errorCodes'
export {BifurClient}

export function fromUrl(url: string, options: Options = {}): BifurClient {
  const {timeout, token$} = options

  const connect = createConnect<WebSocket>(
    (url: string, protocols?: string | string[]) =>
      new window.WebSocket(url, protocols),
  )

  return createClient(
    connect(url).pipe(
      timeout
        ? timeoutFirstWith(
            timeout,
            throwError(() =>
              new Error(
                `Timeout after ${timeout} while establishing WebSockets connection`,
              ),
            ),
          )
        : id,
      shareReplay({refCount: true}),
      takeUntil(fromEvent(window, 'beforeunload')), // ensure graceful disconnect
    ),
    {token$},
  )
}

export function fromSanityClient(client: SanityClientLike): BifurClient {
  const {dataset, token} = client.config()
  return fromUrl(
    client.getUrl(`/socket/${dataset}`).replace(/^http/, 'ws'),
    token ? {token$: of(token)} : {},
  )
}
