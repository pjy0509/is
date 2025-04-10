export function $enumerable<T = object>(x: T, propertyKey: keyof T): boolean {
    return Object.prototype.propertyIsEnumerable.call(x, propertyKey);
}