import {Observable, timer, race} from 'rxjs'
import {mergeMap} from 'rxjs/operators'

// Operator that will time out using <withObservable> if <due> time passes before receiving the first value
export const timeoutFirstWith = <T>(
  due: number,
  withObservable: Observable<any>,
) => {
  return (input$: Observable<T>): Observable<T> => {
    return race(input$, timer(due).pipe(mergeMap(() => withObservable)))
  }
}
