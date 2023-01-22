"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutFirstWith = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// Operator that will time out using <withObservable> if <due> time passes before receiving the first value
var timeoutFirstWith = function (due, withObservable) {
    return function (input$) {
        return (0, rxjs_1.race)(input$, (0, rxjs_1.timer)(due).pipe((0, operators_1.mergeMap)(function () { return withObservable; })));
    };
};
exports.timeoutFirstWith = timeoutFirstWith;
