export function $values<T extends object>(x: T): T[keyof T][] {
    return Object.keys(x) as T[keyof T][];
}