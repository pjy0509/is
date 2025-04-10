import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../../utils/types";
import {$keyIs} from "./keyIs";
import {$valueIs} from "./valueIs";

export function $is<T extends PrimitiveTypeKey, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<PrimitiveType<T>, PrimitiveType<U>>;
export function $is<T extends PrimitiveTypeKey, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<PrimitiveType<T>, Constructor<any>>;
export function $is<T extends PrimitiveTypeKey, U>(x: Map<unknown, unknown>, keyType: T, valueType: Constructor<U>): x is Map<PrimitiveType<T>, U>;
export function $is<T extends ConstructorKey, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<Constructor<any>, PrimitiveType<U>>;
export function $is<T extends ConstructorKey, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<Constructor<any>, Constructor<any>>;
export function $is<T extends ConstructorKey, U>(x: Map<unknown, unknown>, keyType: T, valueType: Constructor<U>): x is Map<Constructor<any>, U>;
export function $is<T, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: U): x is Map<T, PrimitiveType<U>>;
export function $is<T, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: U): x is Map<T, Constructor<any>>;
export function $is<T, U>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: Constructor<U>): x is Map<T, U>;
export function $is<T, U>(x: Map<unknown, unknown>, keyType: any, valueType: any): x is Map<T, U> {
    return $keyIs(x, keyType) && $valueIs(x, valueType);
}