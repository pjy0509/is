import {Base} from "../../utils/types";
import {$converter} from "../internal/number/converter";
import {$clamp} from "../internal/number/clamp";
import {$sum} from "../internal/number/sum";
import {$mean} from "../internal/number/mean";
import {$rand} from "../internal/number/rand";
import {$randInt} from "../internal/number/randInt";
import {$ordinal} from "../internal/number/ordinal";
import {$radix} from "../internal/number/radix";

export interface NumberConverter {
    (): number;

    (x: unknown): number;

    <T extends any[]>(...x: T): number;

    clamp(x: number, bound1?: number, bound2?: number): number;

    sum(...x: number[]): number;

    mean(...x: number[]): number;

    rand(bound1?: number, bound2?: number): number;

    randInt(bound1?: number, bound2?: number): number;

    ordinal(x: number): string;

    radix(x: string, base: Base): number;

    [Symbol.toStringTag]: string;
}

export const $number: NumberConverter = Object.assign(
    $converter,
    {
        clamp: $clamp,
        sum: $sum,
        mean: $mean,
        rand: $rand,
        randInt: $randInt,
        ordinal: $ordinal,
        radix: $radix,

        [Symbol.toStringTag]: "To.Number"
    }
)