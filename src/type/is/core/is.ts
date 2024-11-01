import {Constructor, ConstructorKey, PathRecord, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import {$string, StringPredicate} from "../internal/string";
import {$number, NumberPredicate} from "../internal/number";
import {$boolean, BooleanPredicate} from "../internal/boolean";
import {$object, ObjectPredicate} from "../internal/object";
import {$function, FunctionPredicate} from "../internal/function";
import {$symbol, SymbolPredicate} from "../internal/symbol";
import {$bigint, BigintPredicate} from "../internal/bigint";
import {$array, ArrayPredicate} from "../internal/array";
import {$set, SetPredicate} from "../internal/set";
import {$map, MapPredicate} from "../internal/map";
import {$node, NodePredicate} from "../internal/node";
import {$file, FilePredicate} from "../internal/file";
import {$date, DatePredicate} from "../internal/date";
import {equalDeep, isValueJsonEncodable} from "../../utils/functions";
import {noopClass} from "../../utils/constants";

export interface Predicate {
    <T extends PrimitiveTypeKey>(x: unknown, type: T): x is PrimitiveType<T>;

    <T extends ConstructorKey>(x: unknown, type: T): x is Constructor<any>;

    <T>(x: unknown, type: Constructor<T>): x is T;

    string: StringPredicate;
    number: NumberPredicate;
    boolean: BooleanPredicate;
    object: ObjectPredicate;
    function: FunctionPredicate;
    symbol: SymbolPredicate;
    bigint: BigintPredicate;
    array: ArrayPredicate;
    set: SetPredicate;
    map: MapPredicate;
    node: NodePredicate;
    file: FilePredicate;
    date: DatePredicate;

    in<Key extends PropertyKey, T, U extends PrimitiveTypeKey>(x: T, propertyKeys: Key, type: U): x is T & PathRecord<Key, PrimitiveType<U>>;

    in<Key extends PropertyKey, T, U extends ConstructorKey>(x: T, propertyKeys: Key, type: U): x is T & PathRecord<Key, Constructor<any>>;

    in<Key extends PropertyKey, T, U>(x: T, propertyKeys: Key, type?: Constructor<U>): x is T & PathRecord<Key, U>;

    constructor(x: unknown): x is Constructor<any>;

    blob(x: unknown): x is Blob;

    buffer(x: unknown): x is Buffer;

    regexp(x: unknown): x is RegExp;

    dataView(x: unknown): x is DataView;

    error(x: unknown): x is Error;

    argument(x: unknown): x is IArguments;

    propertyKey(x: unknown): x is PropertyKey;

    iterator<T>(x: unknown): x is Iterator<T>;

    iterable<T, U>(x: U): x is U & Iterable<T>;

    null(x: unknown): x is null;

    undefined(x: unknown): x is undefined;

    prototype(x: unknown): boolean;

    falsy(x: unknown): boolean;

    truthy(x: unknown): boolean;

    nil(x: unknown): x is null | undefined;

    notNil<T>(x: T | null | undefined): x is T;

    primitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint;

    jsonEncodable(x: unknown): boolean;

    index(x: unknown): boolean;

    eq(lhs: any, rhs: any, customComparator?: (lhs?: any, rhs?: any) => boolean | undefined): boolean;
}

export const is: Predicate = Object.assign(
    function $is<T>(x: unknown, type: any): x is T {
        if (type === "constructor") return is.constructor(x);
        if (typeof type === "string") return typeof x === type;
        if (typeof type === "undefined") return false;

        return x instanceof type;
    },
    {
        string: $string,
        number: $number,
        boolean: $boolean,
        object: $object,
        function: $function,
        symbol: $symbol,
        bigint: $bigint,
        array: $array,
        set: $set,
        map: $map,
        node: $node,
        file: $file,
        date: $date,

        in: function $in<Key extends PropertyKey, T, U>(x: T, propertyKeys: Key, type?: any): x is T & PathRecord<Key, U> {
            let current: any = x;

            if (typeof propertyKeys === "string" && propertyKeys.includes(".")) {
                for (const key of propertyKeys.split(".")) {
                    if (!is.in(current, key)) return false;
                    current = current[key];
                }

                return type === undefined || is(current, type);
            }

            if (current == null) return false;
            if ((typeof current === "object" || typeof current === "function") && !(propertyKeys in current)) return false;
            if (!!current[propertyKeys]) return false;

            return type === undefined || is(current[propertyKeys], type);
        },

        constructor: function $constructor(x: unknown): x is Constructor<any> {
            if (typeof x !== 'function') return false;

            try {
                Reflect.construct(noopClass, [], x);
            } catch (err) {
                return false;
            }

            return true;
        },

        blob: function $blob(x: unknown): x is Blob {
            return x instanceof Blob && !(x instanceof File);
        },

        buffer: function $buffer(x: unknown): x is Buffer {
            return x instanceof Buffer;
        },

        regexp: function $regexp(x: unknown): x is RegExp {
            return x instanceof RegExp;
        },

        dataView: function $dataView(x: unknown): x is DataView {
            return x instanceof DataView;
        },

        error: function $error(x: unknown): x is Error {
            return x instanceof Error;
        },

        argument: function $argument(x: unknown): x is IArguments {
            return typeof x === "object" && is.in(x, "callee") && !Object.prototype.propertyIsEnumerable.call(x, "callee");
        },

        propertyKey: function $propertyKey(x: unknown): x is PropertyKey {
            const type: string = typeof x;

            return type === "string" || type === "number" || type === "symbol";
        },

        iterator: function $iterator<T>(x: unknown): x is Iterator<T> {
            return x instanceof ""[Symbol.iterator]().constructor;
        },

        iterable: function $iterable<T, U = unknown>(x: U): x is U & Iterable<T> {
            return is.in(x, Symbol.iterator, "function") && is.in(x[Symbol.iterator](), "next", "function");
        },

        null: function $null(x: unknown): x is null {
            return x === null;
        },

        undefined: function $undefined(x: unknown): x is undefined {
            return x === undefined;
        },

        prototype: function $prototype(x: unknown): x is Function {
            const constructor = x && x.constructor;
            const prototype = (typeof constructor === "function" && constructor.prototype) || Object.prototype;

            return x === prototype;
        },

        falsy: function $falsy(x: unknown): boolean {
            return x == null || x === false || x === 0 || x === -0 || (typeof BigInt === "function" && x === BigInt(0)) || Number.isNaN(x) || x === "";
        },

        truthy: function $truthy(x: unknown): boolean {
            return x != null && x !== false && x !== 0 && x !== -0 && (typeof BigInt !== "function" || x !== BigInt(0)) && !Number.isNaN(x) && x !== "";
        },

        nil: function $nil(x: unknown): x is null | undefined {
            return x == null;
        },

        notNil: function $notNil<T>(x: T | null | undefined): x is T {
            return x != null;
        },

        primitive: function $primitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint {
            return x == null || (typeof x !== "object" && typeof x !== "function");
        },

        jsonEncodable: function $jsonEncodable(x: unknown): boolean {
            return isValueJsonEncodable(x);
        },

        index: function $index(x: PropertyKey): boolean {
            const type: string = typeof x;

            return (type === "number" && is.number.index(x)) || (type === "string" && is.string.index(x));
        },

        eq: function $eq(lhs: any, rhs: any, customComparator?: (lhs?: any, rhs?: any) => boolean | undefined): boolean {
            return equalDeep(lhs, rhs, customComparator);
        }
    }
);