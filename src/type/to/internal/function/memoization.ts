import {MemoizationFunction} from "../../../utils/types";
import {apply} from "../../../utils/function/apply";
import {MemoizationMap} from "../../../utils/class/MemoizationMap";
import {memoizationSymbol} from "../../../utils/constant/memoizationSymbol";
import {setImmutableProperty} from "../../../utils/function/setImmutableProperty";

export function $memoization<T extends (...args: any[]) => any>(x: T, age?: number): MemoizationFunction<T> {
    const memoization = function (this: unknown, ...args: Parameters<T>) {
        if (MemoizationMap.instance.has(x, arguments)) {
            return MemoizationMap.instance.get(x, arguments);
        } else {
            const returnValue = apply(this, x, args);

            MemoizationMap.instance.set(x, arguments, returnValue, age);

            return returnValue;
        }
    }

    setImmutableProperty(memoization, memoizationSymbol);
    setImmutableProperty(memoization, "clear", () => MemoizationMap.instance.delete(x));

    return memoization as MemoizationFunction<T>;
}