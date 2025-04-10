export function $predicate(x: unknown): x is (...args: any[]) => any {
    return typeof x === "function"
}