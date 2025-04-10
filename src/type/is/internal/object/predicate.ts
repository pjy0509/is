export function $predicate(x: unknown): x is object {
    return x !== null && typeof x === "object"
}