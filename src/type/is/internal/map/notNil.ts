import {$nil} from "./nil";

export function $notNil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, Exclude<T, null | undefined>> {
    return !$nil(x);
}