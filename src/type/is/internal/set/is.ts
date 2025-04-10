import {$predicate as $is_predicate} from "../is/is";
import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../../utils/types";

export function $is<T extends PrimitiveTypeKey>(x: Set<unknown>, type: T): x is Set<PrimitiveType<T>>;
export function $is<T extends ConstructorKey>(x: Set<unknown>, type: T): x is Set<Constructor<any>>;
export function $is<T>(x: Set<unknown>, type: Constructor<T>): x is Set<T>;
export function $is<T>(x: Set<unknown>, type: any): x is Set<T> {
    return $is_predicate(Array.from(x), type);
}