import {$predicate} from "./predicate";

export function $fragment(x: unknown): x is DocumentFragment {
    return $predicate(x) && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}