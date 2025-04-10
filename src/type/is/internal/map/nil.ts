import {$nil as $array_nil} from "../array/nil";

export function $nil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, T | null | undefined> {
    return $array_nil(Array.from(x.values()));
}