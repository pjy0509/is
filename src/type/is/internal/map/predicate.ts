export function $predicate(x: unknown): x is Map<unknown, unknown> {
    return x instanceof Map;
}