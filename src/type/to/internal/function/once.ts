import {apply} from "../../../utils/function/apply";
import {setImmutableProperty} from "../../../utils/function/setImmutableProperty";

export function $once<T extends (...args: any[]) => any>(x: T): T {
    const cached: any = function (this: unknown, ...args: Parameters<T>) {
        if (!Object.prototype.hasOwnProperty.call(cached, "cache")) {
            setImmutableProperty(cached, "cache", apply(this, x, args));
        }

        return cached.cache;
    }

    return cached;
}