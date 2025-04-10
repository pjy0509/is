export function $keys<T extends object>(x: T): (keyof T)[] {
    return Object.keys(x) as (keyof T)[];
}