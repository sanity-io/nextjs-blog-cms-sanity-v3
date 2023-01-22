import { timer, race } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Operator that will time out using <withObservable> if <due> time passes before receiving the first value
export const timeoutFirstWith = (due, withObservable) => {
    return (input$) => {
        return race(input$, timer(due).pipe(mergeMap(() => withObservable)));
    };
};
