import {$predicate} from "./predicate";

export function $cdata(x: unknown): x is CDATASection {
    return $predicate(x) && x.nodeType === Node.CDATA_SECTION_NODE;
}