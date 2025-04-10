import {$converter} from "../../../to/internal/array/converter";
import {$every} from "../../../utils/function/every";

export function $notNil<T>(x: (T | null | undefined)[]): x is Exclude<T, null | undefined>[];
export function $notNil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>>;
export function $notNil(x: ArrayLike<any>): boolean {
    return $every($converter(x), element => element != null);
}