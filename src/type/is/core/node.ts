import {$predicate} from "../internal/node/predicate";
import {$element} from "../internal/node/element";
import {$attr} from "../internal/node/attr";
import {$text} from "../internal/node/text";
import {$cdata} from "../internal/node/cdata";
import {$processingInstruction} from "../internal/node/processingInstruction";
import {$comment} from "../internal/node/comment";
import {$document} from "../internal/node/document";
import {$documentType} from "../internal/node/documentType";
import {$fragment} from "../internal/node/fragment";
import {$shadowRoot} from "../internal/node/shadowRoot";
import {$validSelector} from "../internal/node/validSelector";
import {$validPseudo} from "../internal/node/validPseudo";

export interface NodePredicate {
    (x: unknown): x is Node;

    element(x: unknown): x is HTMLElement;

    element<T extends keyof HTMLElementTagNameMap>(x: unknown, tag?: T): x is HTMLElementTagNameMap[T];

    element<T extends keyof HTMLElementDeprecatedTagNameMap>(x: unknown, tag?: T): x is HTMLElementDeprecatedTagNameMap[T];

    element<T extends keyof SVGElementTagNameMap>(x: unknown, tag?: T): x is SVGElementTagNameMap[T];

    attr(x: unknown): x is Attr;

    text(x: unknown): x is Text;

    cdata(x: unknown): x is CDATASection;

    processingInstruction(x: unknown): x is ProcessingInstruction;

    comment(x: unknown): x is Comment;

    document(x: unknown): x is Document;

    documentType(x: unknown): x is DocumentType;

    fragment(x: unknown): x is DocumentFragment;

    shadowRoot(x: unknown): x is ShadowRoot;

    validSelector(x: string): boolean;

    validPseudo(x: string): boolean;
}

export const $node: NodePredicate = Object.assign(
    $predicate,
    {
        element: $element,
        attr: $attr,
        text: $text,
        cdata: $cdata,
        processingInstruction: $processingInstruction,
        comment: $comment,
        document: $document,
        documentType: $documentType,
        fragment: $fragment,
        shadowRoot: $shadowRoot,
        validSelector: $validSelector,
        validPseudo: $validPseudo,
    }
);