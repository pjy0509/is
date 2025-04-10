import {$style} from "../internal/node/style";
import {$string} from "../internal/node/string";
import {$sibling} from "../internal/node/sibling";
import {$elementSibling} from "../internal/node/elementSibling";
import {CSSStyle} from "../../utils/types";
import {$css} from "../internal/node/css";

export interface NodeConverter {
    style: CSSStyleSheet;

    string(x: Node): string;

    sibling(x: Node, n: number): Node | null;

    elementSibling(x: NonDocumentTypeChildNode, n: number): NonDocumentTypeChildNode | null;

    css(x: NodeList | HTMLCollection | Node | string | string[], style: CSSStyle, option?: { pseudo?: string, media?: string }): () => void;

    [Symbol.toStringTag]: string;
}

export const $node: NodeConverter = {
    style: $style,
    string: $string,
    sibling: $sibling,
    elementSibling: $elementSibling,
    css: $css,

    [Symbol.toStringTag]: "To.Node",
}
