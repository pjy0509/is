import {Constructor, ConstructorKey, Falsy, JSONValue, PathRecord, PrimitiveType, PrimitiveTypeKey, Truthy} from "../../utils/types";
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
import {equalDeep, isArrayJsonEncodable, isObjectJsonEncodable, isValueJsonEncodable} from "../../utils/functions";
import to from "../../to/index";

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

    in<T, Key extends PropertyKey, U extends PrimitiveTypeKey>(x: T, key: Key, type: U): x is T & PathRecord<Key, PrimitiveType<U>>;

    in<T, Key extends PropertyKey, U extends ConstructorKey>(x: T, key: Key, type: U): x is T & PathRecord<Key, Constructor<any>>;

    in<T, Key extends PropertyKey, U>(x: T, key: Key, type?: Constructor<U>): x is T & PathRecord<Key, U>;

    constructor(x: unknown): x is Constructor<any>;

    blob(x: unknown): x is Blob;

    buffer(x: unknown): x is Buffer;

    sharedArrayBuffer(x: unknown): x is SharedArrayBuffer;

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

    falsy(x: unknown): x is Falsy;

    truthy<T = unknown>(x: T): x is Truthy<T>;

    nil(x: unknown): x is null | undefined;

    notNil<T>(x: T | null | undefined): x is T;

    primitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint;

    jsonValue(x: unknown): x is JSONValue | JSONValue[] | Record<string, JSONValue>;

    jsonArray(x: unknown): x is JSONValue[];

    jsonObject(x: unknown): x is Record<string, JSONValue>;

    index(x: unknown): boolean;

    eq(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean | undefined): boolean;
}

export const is: Predicate = Object.assign(
    function $is<T>(x: unknown, type: any): x is T {
        if (type === "constructor") {
            return is.constructor(x);
        }

        if (type === "object") {
            return typeof x === "object" && x !== null;
        }

        if (typeof type === "string") {
            return typeof x === type;
        }

        if (typeof type === "undefined") {
            return false;
        }

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

        in: function $in<T, Key extends PropertyKey, U>(x: T, propertyKeys: Key, type?: any): x is T & PathRecord<Key, U> {
            let current: any = x;

            if (typeof propertyKeys === "string" && propertyKeys.includes(".")) {
                for (const key of propertyKeys.split(".")) {
                    if (!is.in(current, key)) {
                        return false;
                    }
                    
                    current = to.object.get(current, key);
                }

                return type === undefined || is(current, type);
            }

            if (current == null) {
                return false;
            }

            return to.object.has(current, propertyKeys) && (type === undefined || is(to.object.get(current, propertyKeys), type));
        },

        constructor: function $constructor(x: unknown): x is Constructor<any> {
            if (typeof x !== 'function') {
                return false;
            }

            try {
                Reflect.construct(String, [], x);
                const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(x, "prototype");
                return !(!descriptor || descriptor.writable);
            } catch (e) {
                return false;
            }
        },

        blob: function $blob(x: unknown): x is Blob {
            try {
                return x instanceof Blob;
            } catch {
                return false;
            }
        },

        buffer: function $buffer(x: unknown): x is Buffer {
            try {
                return x instanceof Buffer;
            } catch {
                return false;
            }
        },

        sharedArrayBuffer: function $sharedArrayBuffer(x: unknown): x is SharedArrayBuffer {
            try {
                return x instanceof SharedArrayBuffer;
            } catch {
                return false;
            }
        },

        regexp: function $regexp(x: unknown): x is RegExp {
            try {
                return x instanceof RegExp;
            } catch {
                return false;
            }
        },

        dataView: function $dataView(x: unknown): x is DataView {
            try {
                return x instanceof DataView;
            } catch {
                return false;
            }
        },

        error: function $error(x: unknown): x is Error {
            try {
                return x instanceof Error || x instanceof DOMException;
            } catch {
                return false;
            }
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

        falsy: function $falsy(x: unknown): x is Falsy {
            return x == null || x === false || x === 0 || x === -0 || (typeof BigInt === "function" && x === BigInt(0)) || Number.isNaN(x) || x === "";
        },

        truthy: function $truthy<T = unknown>(x: T): x is Truthy<T> {
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

        jsonValue: function $jsonValue(x: unknown): x is JSONValue | JSONValue[] | Record<string, JSONValue> {
            return isValueJsonEncodable(x);
        },

        jsonArray: function $jsonValue(x: unknown): x is JSONValue[] {
            return isArrayJsonEncodable(x);
        },

        jsonObject: function $jsonValue(x: unknown): x is Record<string, JSONValue> {
            return isObjectJsonEncodable(x);
        },

        index: function $index(x: PropertyKey): boolean {
            const type: string = typeof x;

            return (type === "number" && is.number.index(x as number)) || (type === "string" && is.string.index(x as string));
        },

        eq: function $eq(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean | undefined): boolean {
            return equalDeep(lhs, rhs, comparator);
        }
    }
);