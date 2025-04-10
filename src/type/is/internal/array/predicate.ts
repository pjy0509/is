export function $predicate(x: unknown): x is unknown[] {
    return Array.isArray(x);
}