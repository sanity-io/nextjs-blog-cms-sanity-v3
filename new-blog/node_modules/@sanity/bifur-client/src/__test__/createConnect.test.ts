import {createConnect, WebSocket, WebSocketError} from '../createConnect'
import {catchError, take, takeUntil, tap, toArray} from 'rxjs/operators'
import {lastValueFrom, of, timer} from 'rxjs'

const createMockWS = (): WebSocket => ({
  onclose: null,
  onerror: null,
  onmessage: null,
  onopen: null,
  close(code?: number, reason?: string) {},
})

describe('createConnect', () => {
  it('emits the connection upon successfully open', async () => {
    const mockWs = createMockWS()
    const connect = createConnect(() => mockWs)

    const conn$ = connect('https://mock')
    setTimeout(() => {
      mockWs.onopen!({})
    }, 100)

    await lastValueFrom(
      conn$.pipe(
        tap(ws => {
          expect(ws).toBe(mockWs)
        }),
        take(1),
      ),
    )
  })

  it('closes the connection gracefully upon unsubscribe', async () => {
    const mockWs = createMockWS()

    const connect = createConnect(() => mockWs)

    const conn$ = connect('https://mock')

    const closed = new Promise<{code: number; reason: string}>(
      resolve =>
        (mockWs.close = (code: number, reason: string) =>
          resolve({code, reason})),
    )

    const defaultValue = {}

    const [closeEvent, connection] = await Promise.all([
      closed,
      lastValueFrom(conn$.pipe(takeUntil(timer(100))), {defaultValue}),
    ])

    expect(closeEvent.code).toBe(1000)

    // we expect defaultValue from the observable since onopen didn't happen
    // before close so the connection should never emit any value
    expect(connection).toBe(defaultValue)
  })

  it('throws a connection error if the connection emits an error', async () => {
    const mockWs = createMockWS()
    const connect = createConnect(() => mockWs)

    const conn$ = connect('https://mock')

    setTimeout(() => {
      mockWs.onerror!({})
    }, 10)

    const res = await lastValueFrom(
      conn$.pipe(
        catchError((err: WebSocketError) => of(err)),
        toArray(),
      ),
    )

    expect(res.length).toBe(1)
    expect(res[0]).toBeInstanceOf(Error)
    expect((<WebSocketError>res[0]).type).toEqual('CONNECTION_ERROR')
  })

  it('throws an error on unexpected close', async () => {
    const mockWs = createMockWS()
    const connect = createConnect(() => mockWs)

    const conn$ = connect('https://mock')

    setTimeout(() => {
      mockWs.onclose!({
        reason: 'Unexpected close',
        code: 1006,
        wasClean: false,
      } as CloseEvent)
    }, 10)

    const res = await lastValueFrom(
      conn$.pipe(
        catchError((err: WebSocketError) => of(err)),
        toArray(),
      ),
    )

    expect(res.length).toBe(1)
    expect(res[0]).toBeInstanceOf(Error)
    expect((<WebSocketError>res[0]).type).toEqual('CONNECTION_CLOSED')
    expect((<WebSocketError>res[0]).code).toEqual(1006)
    expect((<WebSocketError>res[0]).reason).toEqual('Unexpected close')
  })
})
