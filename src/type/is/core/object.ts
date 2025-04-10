import {$predicate} from "../internal/object/predicate";
import {$plain} from "../internal/object/plain";
import {$writable} from "../internal/object/writable";
import {$configurable} from "../internal/object/configurable";
import {$enumerable} from "../internal/object/enumerable";

export interface ObjectPredicate {
    (x: unknown): x is object;

    plain(x: unknown): x is Record<PropertyKey, any>;

    writable<T = object>(x: T, propertyKey: keyof T): boolean;

    configurable<T = object>(x: T, propertyKey: keyof T): boolean;

    enumerable<T = object>(x: T, propertyKey: keyof T): boolean;
}

export const $object: ObjectPredicate = Object.assign(
    $predicate,
    {
        plain: $plain,
        writable: $writable,
        configurable: $configurable,
        enumerable: $enumerable,
    }
);