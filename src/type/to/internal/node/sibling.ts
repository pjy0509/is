export function $sibling(x: Node, n: number): Node | null {
    if (n === 0) {
        return null;
    }

    let method = (x: Node) => x.nextSibling;

    if (n < 0) {
        method = (x: Node) => x.previousSibling;
    }

    for (let i = 0; i < Math.abs(n); i++) {
        const next: ChildNode | null | undefined = method(x);

        if (next == null) {
            return null;
        }

        x = next;
    }

    return x;
}