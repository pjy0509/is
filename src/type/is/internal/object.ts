export interface ObjectPredicate {
    (x: unknown): x is object;

    plain(x: unknown): x is Record<PropertyKey, any>;

    like(x: unknown): x is object;

    writable<T = object>(x: T, propertyKey: keyof T): boolean;

    configurable<T = object>(x: T, propertyKey: keyof T): boolean;

    enumerable<T = object>(x: T, propertyKey: keyof T): boolean;
}

export const $object: ObjectPredicate = Object.assign(
    function $object(x: unknown): x is object {
        return typeof x === "object"
    },
    {
        plain: function $plain(x: unknown): x is Record<PropertyKey, any> {
            if (!x || !(typeof x === "object")) return false;

            const proto: any = Object.getPrototypeOf(x);

            return (proto === null || Object.getPrototypeOf(proto) === null || proto === Object.prototype) && Object.prototype.toString.call(x) === "[object Object]";
        },

        like: function $like(x: unknown): x is object {
            return typeof x === "object" && x !== null;
        },

        writable: function $writable<T = object>(x: T, propertyKey: keyof T): boolean {
            return Object.getOwnPropertyDescriptor(x, propertyKey)?.writable ?? false;
        },

        configurable: function $configurable<T = object>(x: T, propertyKey: keyof T): boolean {
            return Object.getOwnPropertyDescriptor(x, propertyKey)?.configurable ?? false;
        },

        enumerable: function $enumerable<T = object>(x: T, propertyKey: keyof T): boolean {
            return Object.prototype.propertyIsEnumerable.call(x, propertyKey);
        },
    }
);