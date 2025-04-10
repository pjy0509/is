import {apply} from "../../../utils/function/apply";

export function $void<T extends (...args: any[]) => any>(x: T): (...args: Parameters<T>) => void {
    return function (this: unknown, ...args: Parameters<T>) {
        apply(this, x, args);
    }
}