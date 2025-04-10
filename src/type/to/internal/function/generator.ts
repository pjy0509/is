import {apply} from "../../../utils/function/apply";

export function $generator<T extends (...args: any[]) => any>(x: T, ...argsList: Parameters<T>[]): Generator<ReturnType<T>, void> {
    return function* (this: unknown) {
        for (const args of argsList) {
            yield apply(this, x, args);
        }
    }();
}