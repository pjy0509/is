import {$predicate} from "./predicate";

export function $document(x: unknown): x is Document {
    return $predicate(x) && x.nodeType === Node.DOCUMENT_NODE;
}