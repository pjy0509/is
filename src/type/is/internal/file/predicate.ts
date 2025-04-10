export function $predicate(x: unknown): x is File {
    return x instanceof File
}