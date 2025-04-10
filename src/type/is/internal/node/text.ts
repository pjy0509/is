import {$predicate} from "./predicate";

export function $text(x: unknown): x is Text {
    return $predicate(x) && x.nodeType === Node.TEXT_NODE;
}