export function $elementSibling(x: NonDocumentTypeChildNode, n: number): NonDocumentTypeChildNode | null {
    if (n === 0) {
        return null;
    }

    let method = (x: NonDocumentTypeChildNode) => x.nextElementSibling;

    if (n < 0) {
        method = (x: NonDocumentTypeChildNode) => x.previousElementSibling;
    }

    for (let i = 0; i < Math.abs(n); i++) {
        const next: Element | null | undefined = method(x);

        if (next == null) {
            return null;
        }

        x = next;
    }

    return x;
}