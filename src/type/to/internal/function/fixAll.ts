import {apply} from "../../../utils/function/apply";

export function $fixAll<T extends (...args: any[]) => any>(x: T, ...args: Parameters<T>): () => ReturnType<T> {
    return function (this: unknown) {
        return apply(this, x, args);
    }
}