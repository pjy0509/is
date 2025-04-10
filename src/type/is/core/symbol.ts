import {$predicate} from "../internal/symbol/predicate";
import {$global} from "../internal/symbol/global";

export interface SymbolPredicate {
    (x: unknown): x is symbol;

    global(x: symbol): boolean;
}

export const $symbol: SymbolPredicate = Object.assign(
    $predicate,
    {
        global: $global,
    }
)