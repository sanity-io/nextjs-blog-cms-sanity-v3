import { timer, race } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Operator that will time out using <withObservable> if <due> time passes before receiving the first value
export var timeoutFirstWith = function (due, withObservable) {
    return function (input$) {
        return race(input$, timer(due).pipe(mergeMap(function () { return withObservable; })));
    };
};
