import {is} from "../../core/is";

export function $attr(x: unknown): x is Attr {
    return is.node(x) && x.nodeType === Node.ATTRIBUTE_NODE;
}