import {$parallel} from "./parallel";

export function $serial<T, U extends PropertyKey>(x: { [Key in U]: (() => T | PromiseLike<T>) }): Promise<{ [Key in U]: Awaited<T> }> {
    return $parallel(x, 1);
}