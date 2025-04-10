export function $predicate(x: unknown): x is string {
    return typeof x === "string";
}