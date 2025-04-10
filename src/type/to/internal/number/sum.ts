import {$converter} from "./converter";

export function $sum(...x: number[]): number {
    let sum = 0;

    for (let i = 0; i < x.length; i++) {
        sum += $converter(x[i]);
    }

    return sum;
}