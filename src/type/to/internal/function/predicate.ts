import {$eq} from "../../../is/internal/is/eq";

export function $predicate<T, U>(x: (...args: any[]) => any, deep: boolean = false): (lhs: T, rhs: U) => boolean {
    return function (this: unknown, lhs: T, rhs: U) {
        return deep ? $eq(x(lhs), x(rhs)) : x(lhs) === x(rhs);
    }
}