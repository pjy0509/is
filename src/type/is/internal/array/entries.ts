import {$predicate} from "./predicate";
import {$converter} from "../../../to/internal/array/converter";

export function $entries(x: ArrayLike<unknown>): x is [any, any][] {
    return $converter(x).every(entry => $predicate(entry) && entry.length === 2);
}