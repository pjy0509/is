import {$index} from "../number";

export function $likeObject(x: unknown): x is ArrayLike<unknown> & object {
    if (typeof x === "object" && x != null && "length" in x) {
        let length = x.length;

        return (typeof length === "number" && $index(length)) || (typeof length === "string" && /^(?:0|[1-9]\d*)$/.test(length) && $index(+length));
    }

    return false;
}