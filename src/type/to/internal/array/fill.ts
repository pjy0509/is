export function $fill<T = number>(x: number, mapfn: (i: number) => T = (i: number) => i as T): T[] {
    return Array.from({length: x}, (_, i) => mapfn(i));
}