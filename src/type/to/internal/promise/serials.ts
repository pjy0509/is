import {$parallels} from "./parallels";

export function $serials<T>(x: (() => T | PromiseLike<T>)[]): Promise<Awaited<T>[]> {
    return $parallels(x, 1);
}