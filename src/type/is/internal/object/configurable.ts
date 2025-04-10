export function $configurable<T = object>(x: T, propertyKey: keyof T): boolean {
    return Object.getOwnPropertyDescriptor(x, propertyKey)?.configurable ?? false;
}