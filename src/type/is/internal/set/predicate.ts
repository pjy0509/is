export function $predicate(x: unknown): x is Set<unknown> {
    return x instanceof Set;
}