import {is} from "../core/is";
import {getTag, toString} from "../../utils/functions";
import {tags} from "../../utils/constants";

type AsyncFunction = (...args: any[]) => Promise<any>;

export interface FunctionPredicate {
    (x: unknown): x is Function;

    async(x: unknown): x is AsyncFunction;

    generator(x: unknown): x is GeneratorFunction;

    asyncGenerator(x: unknown): x is AsyncGeneratorFunction;

    lambda(x: Function): boolean;

    native(x: unknown): boolean;

    bound(x: Function): boolean;
}

export const $function: FunctionPredicate = Object.assign(
    function $function(x: unknown): x is Function {
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

        lambda: function $lambda(x: Function): boolean {
            return x.name === "";
        },

        native: function $native(x: unknown): boolean {
            const type: string = typeof x;

            if (type == null || type !== "object" && type !== "function") return false;

            let source: string = "";

            try {
                source = Function.prototype.toString.call(x);
            } catch {
            }

            try {
                source = toString(x);
            } catch {

            }

            if (type === "function") {
                return new RegExp('^' + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function)\s*[^(]*\([^)]*\)\s*\{\s*\[native code]\s*}/g, '$1.*?') + '$').test(source)
            }

            return /^\[object .+?Constructor]$/.test(source)
        },

        bound: function $bound(x: Function): boolean {
            return x.name.startsWith("bound ");
        }
    }
);