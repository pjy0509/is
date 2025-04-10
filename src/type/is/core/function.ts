import {MemoizationFunction} from "../../utils/types";
import {$predicate} from "../internal/function/predicate";
import {$async} from "../internal/function/async";
import {$generator} from "../internal/function/generator";
import {$asyncGenerator} from "../internal/function/asyncGenerator";
import {$memoization} from "../internal/function/memoization";
import {$lambda} from "../internal/function/lambda";
import {$native} from "../internal/function/native";
import {$bound} from "../internal/function/bound";

export interface FunctionPredicate {
    (x: unknown): x is (...args: any[]) => any;

    async(x: unknown): x is (...args: any[]) => Promise<any>;

    generator(x: unknown): x is GeneratorFunction;

    asyncGenerator(x: unknown): x is AsyncGeneratorFunction;

    memoization<T extends (...args: any[]) => any>(x: T): x is MemoizationFunction<T>;

    lambda(x: (...args: any[]) => any): boolean;

    native(x: (...args: any[]) => any): boolean;

    bound(x: (...args: any[]) => any): boolean;
}

export const $function: FunctionPredicate = Object.assign(
    $predicate,
    {
        async: $async,
        generator: $generator,
        asyncGenerator: $asyncGenerator,
        memoization: $memoization,
        lambda: $lambda,
        native: $native,
        bound: $bound
    }
);