import {$converter} from "./converter";
import {$sum} from "./sum";

export function $mean(...x: number[]): number {
    if (x.length === 0) {
        return NaN;
    }

    if (x.length === 1) {
        return $converter(x[0]);
    }

    if (x.length === 2) {
        return ($converter(x[0]) + $converter(x[1])) / 2;
    }

    if (x.length === 3) {
        return ($converter(x[0]) + $converter(x[1]) + $converter(x[2])) / 3;
    }

    return $sum(...x) / x.length;
}