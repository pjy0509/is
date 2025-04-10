export function $lambda(x: (...args: any[]) => any): boolean {
    return x.name === "";
}