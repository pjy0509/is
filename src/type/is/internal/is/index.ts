import {$index as $number_index} from "../number";

export function $index(x: PropertyKey): boolean {
    return (typeof x === "number" && $number_index(x)) || (typeof x === "string" && /^(?:0|[1-9]\d*)$/.test(x) && $number_index(+x));
}