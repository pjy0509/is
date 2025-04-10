export function $predicate(x: unknown): x is boolean {
    return typeof x === "boolean";
}