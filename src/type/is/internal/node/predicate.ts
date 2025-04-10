export function $predicate(x: unknown): x is Node {
    return x instanceof Node;
}