import {FlowFunction, FlowFunctionArguments, FunctionObserverHandler, MemoizationFunction, Observable, RemainingParameters, ToFunction, unfixed, Unfixed} from "../../utils/types";
import {MemoizationMap} from "../../utils/MemoizationMap";
import {memoizationSymbol} from "../../utils/constants";
import is from "../../is/index";
import to from "../index";
import {observeFunction, setImmutableProperty} from "../../utils/functions";

export interface FunctionConverter {
    <T extends unknown>(x: T): ToFunction<T>;

    readonly unfixed: Unfixed;

    observable<T extends (...args: any[]) => any>(x: T, handler: FunctionObserverHandler): Observable<T>;

    delay(after?: number): Promise<void> & { abort(): void };

    generator<T extends (...args: any[]) => any>(x: T, ...argsList: Parameters<T>[]): () => Generator<ReturnType<T>, void>;

    memoization<T extends (...args: any[]) => any>(x: T, age?: number): MemoizationFunction<T>;

    negate<T extends (...args: any[]) => boolean>(x: T): T;

    once<T extends (...args: any[]) => any>(x: T): T;

    flow<A, R1>(fn1: (...args: A[]) => R1): (...args: A[]) => R1;

    flow<A, R1, R2>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2): (...args: A[]) => R2;

    flow<A, R1, R2, R3>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3): (...args: A[]) => R3;

    flow<A, R1, R2, R3, R4>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4): (...args: A[]) => R4;

    flow<A, R1, R2, R3, R4, R5>(f1: (...args: A[]) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3, f4: (arg: R3) => R4, f5: (arg: R4) => R5): (...args: A[]) => R5;

    flow<T extends Function[]>(...fns: FlowFunctionArguments<T>): FlowFunction<T>;

    fix<T extends (...args: any[]) => any, F extends { [K in keyof F]: K extends keyof Parameters<T> ? Parameters<T>[K] | Unfixed : number extends Parameters<T>['length'] ? Parameters<T>[Parameters<T>['length']] | Unfixed : never }>(x: T, ...args: F extends any[] ? F : never): (...args: RemainingParameters<T, F extends any[] ? F : never>) => ReturnType<T>;
}

export const $function: FunctionConverter = Object.assign(
    function $function<T extends unknown>(x: T): ToFunction<T> {
        if (is.function(x)) {
            return x as ToFunction<T>;
        }

        return function () {
            return x;
        } as ToFunction<T>;
    },
    {
        unfixed: unfixed as Unfixed,

        observable: function $observable<T extends (...args: any[]) => any>(x: T, handler: FunctionObserverHandler): Observable<T> {
            return observeFunction(x, handler);
        },

        delay: function $delay(after: number = 0): Promise<void> & { abort(): void } {
            let timeoutId: ReturnType<typeof setTimeout> | null = null;
            let aborted: boolean = false;

            const promise: any = new Promise<void>(resolve => {
                timeoutId = setTimeout((): void => {
                    timeoutId = null;

                    if (!aborted) {
                        resolve();
                    }
                }, after);
            });

            promise.abort = function (): void {
                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                    aborted = true;
                }
            };

            return promise;
        },

        generator: function $generator<T extends (...args: any[]) => any>(x: T, ...argsList: Parameters<T>[]): () => Generator<ReturnType<T>, void> {
            return function* (this: unknown): Generator<ReturnType<T>, void> {
                for (const args of argsList) {
                    yield x.call(this, ...args);
                }
            };
        },

        memoization: function $memoization<T extends (...args: any[]) => any>(x: T, age?: number): MemoizationFunction<T> {
            const memoization: any = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
                const returnValue: any = MemoizationMap.instance.get(x, arguments);

                if (returnValue) {
                    return returnValue;
                } else {
                    const st: number = new Date().getTime();
                    const returnValue: any = x.call(this, ...args);

                    MemoizationMap.instance.set(x, arguments, st, returnValue, age);

                    return returnValue;
                }
            }

            setImmutableProperty(memoization, memoizationSymbol);
            setImmutableProperty(memoization, "clear", () => MemoizationMap.instance.delete(x));

            return memoization;
        },

        negate: function $negate<T extends (...args: any[]) => boolean>(x: T): T {
            return function (this: unknown, ...args: Parameters<T>): boolean {
                return !x.call(this, ...args);
            } as T;
        },

        once: function $once<T extends (...args: any[]) => any>(x: T): T {
            const cached: any = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
                if (!Object.prototype.hasOwnProperty.call(cached, "cache")) {
                    setImmutableProperty(cached, "cache", x.call(this, ...args));
                }

                return cached.cache;
            }

            return cached;
        },

        flow: function $flow<T extends Function[]>(...fns: FlowFunctionArguments<T>): FlowFunction<T> {
            return function (this: unknown, ...args: any[]): ReturnType<FlowFunction<T>> {
                let result = fns[0].call(this, ...args);

                for (let i: number = 1; i < fns.length; i++) {
                    result = fns[i].call(this, result);
                }

                return result;
            } as FlowFunction<T>;
        },

        fix: function $fix<T extends (...args: any[]) => any, F extends { [K in keyof F]: K extends keyof Parameters<T> ? Parameters<T>[K] | Unfixed : number extends Parameters<T>['length'] ? Parameters<T>[Parameters<T>['length']] | Unfixed : never }>(x: T, ...args: F extends any[] ? F : never): (...args: RemainingParameters<T, F extends any[] ? F : never>) => ReturnType<T> {
            const fixed: any[] = Array.prototype.slice.call(args);

            return function (this: unknown, ...args: any[]): ReturnType<T> {
                const merged: any[] = [];
                for (let i: number = 0, j: number = 0; i < fixed.length || j < args.length; i++) {
                    if (fixed[i] === to.function.unfixed || i >= fixed.length) {
                        merged.push(args[j++]);
                    } else {
                        merged.push(fixed[i]);
                    }
                }

                return x.call(this, ...merged);
            }
        }
    }
)