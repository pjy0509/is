import {$converter} from "../../../to/internal/array/converter";
import {$some} from "../../../utils/function/some";

export function $nil<T>(x: (T | null | undefined)[]): x is (T | null | undefined)[];
export function $nil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined>;
export function $nil(x: ArrayLike<any>): boolean {
    return $some($converter(x), element => element == null);
}