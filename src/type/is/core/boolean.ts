import {$predicate} from "../internal/boolean/predicate";

export interface BooleanPredicate {
    (x: unknown): x is boolean;
}

export const $boolean: BooleanPredicate = $predicate;