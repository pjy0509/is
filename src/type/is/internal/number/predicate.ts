export function $predicate(x: unknown): x is number {
    return typeof x === "number";
}