import {$string, StringConverter} from "./string";
import {$date, DateConverter} from "./date";
import {$number, NumberConverter} from "./number";
import {$function, FunctionConverter} from "./function";
import {$promise, PromiseConverter} from "./promise";
import {$object, ObjectConverter} from "./object";
import {$array, ArrayConverter} from "./array";
import {$set, SetConverter} from "./set";
import {$node, NodeConverter} from "./node";
import {$converter} from "../internal/to/converter";
import {Constructor} from "../../utils/types";
import {$clone} from "../internal/to/clone";

export interface Converter {
    (x: unknown, be: ArrayConstructor): Array<unknown>;

    (x: unknown, be: SetConstructor): Set<unknown>;

    (x: unknown, be: MapConstructor): Map<unknown, unknown>;

    <T>(x: unknown, be: Constructor<T>): T;

    string: StringConverter;
    date: DateConverter;
    number: NumberConverter;
    function: FunctionConverter;
    promise: PromiseConverter;
    object: ObjectConverter;
    array: ArrayConverter;
    set: SetConverter;
    node: NodeConverter;

    clone<T>(x: T): T;

    [Symbol.toStringTag]: string;
}

export const to: Converter = Object.assign(
    $converter,
    {
        string: $string,
        date: $date,
        number: $number,
        function: $function,
        promise: $promise,
        object: $object,
        array: $array,
        set: $set,
        node: $node,
        clone: $clone,

        [Symbol.toStringTag]: "To"
    }
);