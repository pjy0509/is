import {$predicate} from "../internal/bigint/predicate";

export interface BigintPredicate {
    (x: unknown): x is bigint;
}

export const $bigint: BigintPredicate = $predicate;