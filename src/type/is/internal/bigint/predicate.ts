export function $predicate(x: unknown): x is bigint {
    return typeof x === "bigint";
}