export function $empty<T>(x: Set<T>): boolean {
    return !x.size;
}