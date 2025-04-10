import {apply} from "../../../utils/function/apply";
import {$error} from "../../../is/internal/is/error";

export function $try<T extends (...args: any[]) => any>(x: T): (...args: Parameters<T>) => (ReturnType<T> | Error) {
    return function (this: unknown, ...args: Parameters<T>) {
        try {
            return apply(this, x, args);
        } catch (e) {
            return $error(e) ? e : new Error(e as any);
        }
    }
}