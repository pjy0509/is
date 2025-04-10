export function $empty<T, U>(x: Map<T, U>): boolean {
    return !x.size;
}