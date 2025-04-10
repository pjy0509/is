export function $bound(x: (...args: any[]) => any): boolean {
    return x.name.startsWith("bound ");
}