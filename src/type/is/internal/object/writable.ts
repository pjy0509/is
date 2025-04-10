export function $writable<T = object>(x: T, propertyKey: keyof T): boolean {
    return Object.getOwnPropertyDescriptor(x, propertyKey)?.writable ?? false;
}