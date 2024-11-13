import {Observable} from "../../utils/types";
import {is} from "../core/is";
import {observableSymbol} from "../../utils/constants";

export interface ObjectPredicate {
    (x: unknown): x is object;

    plain(x: unknown): x is Record<PropertyKey, any>;

    frozen<T extends unknown>(x: T): x is Readonly<T>;

    sealed<T extends unknown>(x: T): boolean;

    extensible<T extends unknown>(x: T): boolean;

    writable<T = object>(x: T, propertyKey: keyof T): boolean;

    configurable<T = object>(x: T, propertyKey: keyof T): boolean;

    enumerable<T = object>(x: T, propertyKey: keyof T): boolean;

    observable<T extends object>(x: T): x is Observable<T>;
}

export const $object: ObjectPredicate = Object.assign(
    function $object(x: unknown): x is object {
        return x !== null && typeof x === "object"
    },
    {
        plain: function $plain(x: unknown): x is Record<PropertyKey, any> {
            if (!x || !(typeof x === "object")) {
                return false;
            }

            const proto: any = Object.getPrototypeOf(x);

            return (proto === null || Object.getPrototypeOf(proto) === null || proto === Object.prototype) && Object.prototype.toString.call(x) === "[object Object]";
        },

        frozen: function $frozen<T extends unknown>(x: T): x is Readonly<T> {
            return Object.isFrozen(x);
        },

        sealed: function $sealed<T extends unknown>(x: T): boolean {
            return Object.isSealed(x);
        },

        extensible: function $extensible<T extends unknown>(x: T): boolean {
            return Object.isExtensible(x);
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

        observable: function $observable<T extends object>(x: T): x is Observable<T> {
            return is.in(x, observableSymbol);
        },
    }
);