import {Constructor, ConstructorKey, Falsy, JSONValue, PathRecord, PrimitiveType, PrimitiveTypeKey, Truthy} from "../../utils/types";
import {$string, StringPredicate} from "./string";
import {$number, NumberPredicate} from "./number";
import {$boolean, BooleanPredicate} from "./boolean";
import {$object, ObjectPredicate} from "./object";
import {$function, FunctionPredicate} from "./function";
import {$symbol, SymbolPredicate} from "./symbol";
import {$bigint, BigintPredicate} from "./bigint";
import {$array, ArrayPredicate} from "./array";
import {$set, SetPredicate} from "./set";
import {$map, MapPredicate} from "./map";
import {$node, NodePredicate} from "./node";
import {$file, FilePredicate} from "./file";
import {$date, DatePredicate} from "./date";
import {$promise, PromisePredicate} from "./promise";
import {$predicate} from "../internal/is/is";
import {$in} from "../internal/is/in";
import {$constructor} from "../internal/is/constructor";
import {$blob} from "../internal/is/blob";
import {$buffer} from "../internal/is/buffer";
import {$sharedArrayBuffer} from "../internal/is/sharedArrayBuffer";
import {$regExp} from "../internal/is/regExp";
import {$dataView} from "../internal/is/dataView";
import {$error} from "../internal/is/error";
import {$argument} from "../internal/is/arguments";
import {$propertyKey} from "../internal/is/propertyKey";
import {$iterator} from "../internal/is/iterator";
import {$iterable} from "../internal/is/iterable";
import {$null} from "../internal/is/null";
import {$undefined} from "../internal/is/undefined";
import {$prototype} from "../internal/is/prototype";
import {$eq} from "../internal/is/eq";
import {$falsy} from "../internal/is/falsy";
import {$truthy} from "../internal/is/truthy";
import {$nil} from "../internal/is/nil";
import {$notNil} from "../internal/is/notNil";
import {$primitive} from "../internal/is/primitive";
import {$jsonValue} from "../internal/is/jsonValue";
import {$jsonArray} from "../internal/is/jsonArray";
import {$jsonObject} from "../internal/is/jsonObject";
import {$index} from "../internal/is";

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
    promise: PromisePredicate;

    in<T, Key extends PropertyKey, U extends PrimitiveTypeKey>(x: T, key: Key, type?: U): x is T & PathRecord<Key, PrimitiveType<U>>;

    in<T, Key extends PropertyKey, U extends ConstructorKey>(x: T, key: Key, type?: U): x is T & PathRecord<Key, Constructor<any>>;

    in<T, Key extends PropertyKey, U>(x: T, key: Key, type?: Constructor<U>): x is T & PathRecord<Key, U>;

    constructor(x: unknown): x is Constructor<any>;

    blob(x: unknown): x is Blob;

    buffer(x: unknown): x is Buffer;

    sharedArrayBuffer(x: unknown): x is SharedArrayBuffer;

    regExp(x: unknown): x is RegExp;

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

    jsonArray(x: unknown): x is (JSONValue | JSONValue[] | Record<string, JSONValue>)[];

    jsonObject(x: unknown): x is Record<string, JSONValue | JSONValue[] | Record<string, JSONValue>>;

    index(x: unknown): boolean;

    eq(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean): boolean;

    [Symbol.toStringTag]: string;
}

export const is: Predicate = Object.assign(
    $predicate,
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
        promise: $promise,
        in: $in,
        constructor: $constructor,
        blob: $blob,
        buffer: $buffer,
        sharedArrayBuffer: $sharedArrayBuffer,
        regExp: $regExp,
        dataView: $dataView,
        error: $error,
        argument: $argument,
        propertyKey: $propertyKey,
        iterator: $iterator,
        iterable: $iterable,
        null: $null,
        undefined: $undefined,
        prototype: $prototype,
        falsy: $falsy,
        truthy: $truthy,
        nil: $nil,
        notNil: $notNil,
        primitive: $primitive,
        jsonValue: $jsonValue,
        jsonArray: $jsonArray,
        jsonObject: $jsonObject,
        index: $index,
        eq: $eq,
        [Symbol.toStringTag]: "Is"
    }
);