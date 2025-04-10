import {FlowFunction, FlowFunctionArguments} from "../../../utils/types";
import {apply} from "../../../utils/function/apply";

export function $flow<A, R1>(f1: (...args: A[]) => R1): (arg: A[][0]) => R1;
export function $flow<A, R1, R2>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2): (arg: A[][0]) => R2;
export function $flow<A, R1, R2, R3>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3): (arg: A[][0]) => R3;
export function $flow<A, R1, R2, R3, R4>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4): (arg: A[][0]) => R4;
export function $flow<A, R1, R2, R3, R4, R5>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4, f5: (arg: R4) => R5): (arg: A[][0]) => R5;
export function $flow<T extends Function[]>(...x: FlowFunctionArguments<T>): FlowFunction<T>;
export function $flow<T extends Function[]>(...x: FlowFunctionArguments<T>): FlowFunction<T> {
    return function (this: unknown, ...args: any[]) {
        let result = apply(this, x[0], args);

        for (let i = 1; i < x.length; i++) {
            result = apply(this, x[i], [result]);
        }

        return result;
    } as FlowFunction<T>;
}