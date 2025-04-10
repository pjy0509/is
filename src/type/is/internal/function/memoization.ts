import {MemoizationFunction} from "../../../utils/types";
import {memoizationSymbol} from "../../../utils/constant/memoizationSymbol";

export function $memoization<T extends (...args: any[]) => any>(x: T): x is MemoizationFunction<T> {
    return memoizationSymbol in x;
}