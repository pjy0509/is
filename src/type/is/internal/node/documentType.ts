import {$predicate} from "./predicate";

export function $documentType(x: unknown): x is DocumentType {
    return $predicate(x) && x.nodeType === Node.DOCUMENT_TYPE_NODE;
}