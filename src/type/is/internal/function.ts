import {is} from "../core/is";
import {getTag} from "../../utils/functions";
import {memoizationSymbol, observableSymbol, tags} from "../../utils/constants";
import {AsyncFunction, MemoizationFunction, Observable} from "../../utils/types";
import to from "../../to/index";

export interface FunctionPredicate {
    (x: unknown): x is (...args: any[]) => any;

    async(x: unknown): x is AsyncFunction;

    generator(x: unknown): x is GeneratorFunction;

    asyncGenerator(x: unknown): x is AsyncGeneratorFunction;

    memoization<T extends (...args: any[]) => any>(x: T): x is MemoizationFunction<T>;

    lambda(x: (...args: any[]) => any): boolean;

    native(x: unknown): boolean;

    bound(x: (...args: any[]) => any): boolean;

    observable<T extends (...args: any[]) => any>(x: T): x is Observable<T>;
}

export const $function: FunctionPredicate = Object.assign(
    function $function(x: unknown): x is (...args: any[]) => any {
        return is(x, "function");
    },
    {
        async: function $async(x: unknown): x is AsyncFunction {
            return getTag(x) === tags.asyncFunction;
        },

        generator: function $generator(x: unknown): x is GeneratorFunction {
            return getTag(x) === tags.generatorFunction;
        },

        asyncGenerator: function $asyncGenerator(x: unknown): x is AsyncGeneratorFunction {
            return getTag(x) === tags.asyncGeneratorFunction;
        },

        memoization: function $memoization<T extends (...args: any[]) => any>(x: T): x is MemoizationFunction<T> {
            return is.in(x, memoizationSymbol);
        },

        lambda: function $lambda(x: (...args: any[]) => any): boolean {
            return x.name === "";
        },

        native: function $native(x: unknown): boolean {
            const type: string = typeof x;

            if (type == null || (type !== "object" && type !== "function")) {
                return false;
            }

            let source: string = "";

            try {
                source = Function.prototype.toString.call(x);
            } catch {
                try {
                    source = to.string(x);
                } catch {
                }
            }

            if (type === "function") {
                return new RegExp('^' + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function)\s*[^(]*\([^)]*\)\s*\{\s*\[native code]\s*}/g, '$1.*?') + '$').test(source);
            }

            return /^\[object .+?Constructor]$/.test(source);
        },

        bound: function $bound(x: (...args: any[]) => any): boolean {
            return x.name.startsWith("bound ");
        },

        observable: function $observable<T extends (...args: any[]) => any>(x: T): x is Observable<T> {
            return is.in(x, observableSymbol);
        }
    }
);