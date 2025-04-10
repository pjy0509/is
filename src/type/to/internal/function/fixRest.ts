import {apply} from "../../../utils/function/apply";

export function $fixRest<T extends (...args: any[]) => any>(x: T, ...args: Parameters<T> extends [any, ...infer Rest] ? Rest : never): (arg: Parameters<T>[0]) => ReturnType<T> {
    return function (this: unknown, arg: Parameters<T>[0]) {
        return apply(this, x, [arg, ...args]);
    }
}