import {$string, StringConverter} from "../internal/string";
import {$number, NumberConverter} from "../internal/number";
import {$function, FunctionConverter} from "../internal/function";
import {$object, ObjectConverter} from "../internal/object";
import {$array, ArrayConverter} from "../internal/array";

export interface Converter {
    string: StringConverter;
    number: NumberConverter;
    function: FunctionConverter;
    object: ObjectConverter;
    array: ArrayConverter;
}

export const to: Converter = Object.assign(
    {
    },
    {
        string: $string,
        number: $number,
        function: $function,
        object: $object,
        array: $array
    }
);