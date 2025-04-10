export function $entries<T extends object>(x: T): [keyof T, T[keyof T]][] {
    return Object.entries(x) as [keyof T, T[keyof T]][];
}