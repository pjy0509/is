import {Base} from "../../../utils/types";
import {$converter} from "../number/converter";

export function $radix(x: number, base: Base): string {
    return $converter(x).toString(base);
}