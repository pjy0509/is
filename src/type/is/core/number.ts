import {Range} from "../../utils/types";
import {$predicate} from "../internal/number/predicate";
import {$bt} from "../internal/number/bt";
import {$index} from "../internal/number";

export interface NumberPredicate {
    (x: unknown): x is number;

    bt(x: number, min: unknown, max: number, range?: Range): boolean;

    index(x: number): boolean;
}

export const $number: NumberPredicate = Object.assign(
    $predicate,
    {
        bt: $bt,
        index: $index
    }
);