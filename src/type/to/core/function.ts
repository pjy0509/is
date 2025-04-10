import {FlowFunction, FlowFunctionArguments, MemoizationFunction, RemainingParameters, Unfixed} from "../../utils/types";
import {$converter} from "../internal/function/converter";
import {$unfixed} from "../internal/function/unfixed";
import {$noop} from "../internal/function/noop";
import {$generator} from "../internal/function/generator";
import {$memoization} from "../internal/function/memoization";
import {$negate} from "../internal/function/negate";
import {$once} from "../internal/function/once";
import {$flow} from "../internal/function/flow";
import {$fix} from "../internal/function/fix";
import {$fixRest} from "../internal/function/fixRest";
import {$fixAll} from "../internal/function/fixAll";
import {$try} from "../internal/function/try";
import {$predicate} from "../internal/function/predicate";
import {$void} from "../internal/function/void";

export interface FunctionConverter {
    (): () => void;

    <T extends (...args: any[]) => any>(x: T): T;

    <T>(x: T): () => T;

    <T extends any[]>(...x: T): () => T[number][];

    readonly unfixed: Unfixed;
    readonly noop: Function;

    generator<T extends (...args: any[]) => any>(x: T, ...argsList: Parameters<T>[]): Generator<ReturnType<T>, void>;

    memoization<T extends (...args: any[]) => any>(x: T): MemoizationFunction<T>;

    memoization<T extends (...args: any[]) => any>(x: T, age: number): MemoizationFunction<T>;

    negate<T extends (...args: any[]) => boolean>(x: T): T;

    once<T extends (...args: any[]) => any>(x: T): T;

    flow<A, R1>(f1: (...args: A[]) => R1): (arg: A[][0]) => R1;

    flow<A, R1, R2>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2): (arg: A[][0]) => R2;

    flow<A, R1, R2, R3>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3): (arg: A[][0]) => R3;

    flow<A, R1, R2, R3, R4>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4): (arg: A[][0]) => R4;

    flow<A, R1, R2, R3, R4, R5>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4, f5: (arg: R4) => R5): (arg: A[][0]) => R5;

    flow<T extends Function[]>(...x: FlowFunctionArguments<T>): FlowFunction<T>;

    fix<T extends (...args: any[]) => any, F extends { [K in keyof F]: K extends keyof Parameters<T> ? Parameters<T>[K] | Unfixed : number extends Parameters<T>["length"] ? Parameters<T>[Parameters<T>["length"]] | Unfixed : never }>(x: T, ...args: F extends any[] ? F : never): (...args: RemainingParameters<T, F extends any[] ? F : never>) => ReturnType<T>;

    fixRest<T extends (...args: any[]) => any>(x: T, ...args: Parameters<T> extends [any, ...infer Rest] ? Rest : never): (arg: Parameters<T>[0]) => ReturnType<T>;

    fixAll<T extends (...args: any[]) => any>(x: T, ...args: Parameters<T>): () => ReturnType<T>;

    try<T extends (...args: any[]) => any>(x: T): (...args: Parameters<T>) => (ReturnType<T> | Error);

    predicate<T, U>(x: (...args: any[]) => any, deep: boolean): (lhs: T, rhs: U) => boolean;

    void<T extends (...args: any[]) => any>(x: T): (...args: Parameters<T>) => void;

    [Symbol.toStringTag]: string;
}

export const $function: FunctionConverter = Object.assign(
    $converter,
    {
        unfixed: $unfixed,
        noop: $noop,
        generator: $generator,
        memoization: $memoization,
        negate: $negate,
        once: $once,
        flow: $flow,
        fix: $fix,
        fixRest: $fixRest,
        fixAll: $fixAll,
        try: $try,
        predicate: $predicate,
        void: $void,

        [Symbol.toStringTag]: "To.Function"
    }
)