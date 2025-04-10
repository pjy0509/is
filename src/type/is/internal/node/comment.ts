import {$predicate} from "./predicate";

export function $comment(x: unknown): x is Comment {
    return $predicate(x) && x.nodeType === Node.COMMENT_NODE;
}