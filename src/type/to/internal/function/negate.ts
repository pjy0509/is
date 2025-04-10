import {apply} from "../../../utils/function/apply";

export function $negate<T extends (...args: any[]) => boolean>(x: T) {
    return function (this: unknown, ...args: Parameters<T>): boolean {
        return !apply(this, x, args);
    } as T;
}