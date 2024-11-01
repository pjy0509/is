import {is} from "../core/is";

export interface NodePredicate {
    (x: unknown): x is Node;

    element(x: unknown): x is HTMLElement;

    element<Tag extends keyof HTMLElementTagNameMap>(x: unknown, tag?: Tag): x is HTMLElementTagNameMap[Tag];

    attribute(x: unknown): x is Attr;

    text(x: unknown): x is Text;

    characterDataSection(x: unknown): x is CDATASection;

    processingInstruction(x: unknown): x is ProcessingInstruction;

    comment(x: unknown): x is Comment;

    document(x: unknown): x is Document;

    documentType(x: unknown): x is DocumentType;

    documentFragment(x: unknown): x is DocumentFragment;

    shadowRoot(x: unknown): x is ShadowRoot;
}

export const $node: NodePredicate = Object.assign(
    function $node(x: unknown): x is Node {
        return x instanceof Node;
    },
    {
        element: function $element<Tag extends keyof HTMLElementTagNameMap>(x: unknown, tag?: Tag): x is HTMLElementTagNameMap[Tag] {
            return tag ? x instanceof document.createElement(tag).constructor : is.node(x) && x.nodeType === Node.ELEMENT_NODE;
        },

        attribute: function $attribute(x: unknown): x is Attr {
            return is.node(x) && x.nodeType === Node.ATTRIBUTE_NODE;
        },

        text: function $text(x: unknown): x is Text {
            return is.node(x) && x.nodeType === Node.TEXT_NODE;
        },

        characterDataSection: function $characterDataSection(x: unknown): x is CDATASection {
            return is.node(x) && x.nodeType === Node.CDATA_SECTION_NODE;
        },

        processingInstruction: function $processingInstruction(x: unknown): x is ProcessingInstruction {
            return is.node(x) && x.nodeType === Node.PROCESSING_INSTRUCTION_NODE;
        },

        comment: function $comment(x: unknown): x is Comment {
            return is.node(x) && x.nodeType === Node.COMMENT_NODE;
        },

        document: function $document(x: unknown): x is Document {
            return is.node(x) && x.nodeType === Node.DOCUMENT_NODE;
        },

        documentType: function $documentType(x: unknown): x is DocumentType {
            return is.node(x) && x.nodeType === Node.DOCUMENT_TYPE_NODE;
        },

        documentFragment: function $documentFragment(x: unknown): x is DocumentFragment {
            return is.node(x) && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
        },

        shadowRoot: function $shadowRoot(x: unknown): x is ShadowRoot {
            return x instanceof ShadowRoot;
        }
    }
);