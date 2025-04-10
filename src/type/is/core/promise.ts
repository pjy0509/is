import {$predicate} from "../internal/promise/predicate";

export interface PromisePredicate {
    (x: unknown): x is Promise<unknown>;
}

export const $promise: PromisePredicate = $predicate