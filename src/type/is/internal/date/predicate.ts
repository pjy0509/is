export function $predicate(x: unknown): x is Date {
    return x instanceof Date;
}