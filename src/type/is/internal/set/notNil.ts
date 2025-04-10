import {$nil} from "./nil";

export function $notNil<T>(x: Set<T | null | undefined>): x is Set<Exclude<T, null | undefined>> {
    return !$nil(x);
}