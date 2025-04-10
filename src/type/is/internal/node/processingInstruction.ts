import {$predicate} from "./predicate";

export function $processingInstruction(x: unknown): x is ProcessingInstruction {
    return $predicate(x) && x.nodeType === Node.PROCESSING_INSTRUCTION_NODE;
}