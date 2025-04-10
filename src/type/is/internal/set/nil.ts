import {$nil as $array_nil} from "../array/nil";

export function $nil<T>(x: Set<T | null | undefined>): x is Set<T | null | undefined> {
    return $array_nil(Array.from(x));
}