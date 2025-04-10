import {languages} from "./constant/languages";

export type ConstructorKey = "constructor";

export type Constructor<T> = { new(...args: any[]): T };

export type Falsy = false | null | undefined | 0 | 0n | '';

export type Truthy<T> = Exclude<T, Falsy>;

export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

export type PathRecord<Path extends PropertyKey, Value> =
    Path extends `${infer Key}.${infer Rest}`
        ? {
            [P in Key]: PathRecord<Rest, Value>
        }
        : {
            [P in Path]: Value
        };

export type JSONValue = String | Number | Boolean | string | number | boolean | null;

export type Range =
    | "()"
    | "(]"
    | "[)"
    | "[]";

export type ToFunction<T>
    = T extends (...args: any[]) => any
    ? T
    : () => T;

export type MemoizationFunction<T extends (...args: any[]) => any> = T & { clear: () => boolean };

export type FlowFunctionArguments<Functions extends Function[]> =
    Functions extends [infer First, infer Second, ...infer Rest]
        ? First extends (...args: any[]) => infer Return
            ? Second extends (arg: Return) => any
                ? Rest extends Array<any>
                    ? [First, ...FlowFunctionArguments<[Second, ...Rest]>]
                    : never
                : never
            : never
        : Functions;

export type FlowFunction<Functions extends Function[]> =
    Functions extends [infer First, ...infer Rest]
        ? First extends (...args: infer Args) => infer Return
            ? Rest extends Function[]
                ? Rest extends []
                    ? (...args: Args) => Return
                    : FlowFunction<Rest> extends (arg: Return) => infer FinalReturn
                        ? (...args: Args) => FinalReturn
                        : never
                : never
            : never
        : never;

export const unfixedSymbol: unique symbol = Symbol.for("Unfixed");
export type Unfixed = typeof unfixedSymbol;

export type RemainingParameters<F extends (...args: any[]) => any, A extends any[], P extends any[] = FlatParameters<F>, R extends any[] = []> =
    P extends [infer P0, ...infer PRest]
        ? A extends [infer A0, ...infer ARest]
            ? A0 extends Unfixed
                ? RemainingParameters<F, ARest, PRest, [...R, P0]>
                : RemainingParameters<F, ARest, PRest, R>
            : RemainingParameters<F, [], PRest, [...R, P0]>
        : [...R, ...P];

type FlatParameters<F extends (...args: any[]) => any, P extends any[] = Parameters<F>, R extends any[] = []> =
    P extends [infer A, ...infer Rest]
        ? FlatParameters<F, Rest, [...R, A]>
        : number extends P['length']
            ? [...R, ...P]
            : [...R];

export type ArrayOf<E = unknown> = (E[] | readonly E[]);

export type UnionToTuple<Union extends string, Tuples extends any[] = []> =
    {
        [S in Union]: Exclude<Union, S> extends never
        ? [...Tuples, S]
        : UnionToTuple<Exclude<Union, S>, [...Tuples, S]>
    }[Union];

export type Keys<Value, Ignore = never, Key extends keyof Value = keyof Value> =
    Value extends Ignore
        | number | string | symbol
        | Function | File | Blob | Date | RegExp | Error | IArguments | EventTarget | Promise<any>
        | Set<any> | Map<any, any>
        | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array | SharedArrayBuffer | ArrayBuffer
        ? never
        : Value extends ArrayOf<infer E>
            ? E extends any
                ? Keys<E, Ignore>
                : never
            : [Value] extends [(Value extends unknown ? (k: Value) => void : never) extends (k: infer I) => void ? I : never]
                ? Key extends string
                    ? `${Key}${`.${Keys<Exclude<Value[Key], undefined>, Ignore>}` | ''}`
                    : never
                : Value extends any
                    ? Keys<Value, Ignore>
                    : never;

type DeepOmitTuple<Value, Omitted, Ignore, > = (
    Omitted extends []
        ? Value
        : Omitted extends [infer K, ...infer Rest]
            ? K extends Keys<Value, Ignore>
                ? Rest extends Array<Keys<DeepOmit<Value, K, Ignore>, Ignore>>
                    ? DeepOmitTuple<DeepOmit<Value, K, Ignore>, Rest, Ignore>
                    : never
                : never
            : never
    );

export type DeepOmit<Value, Omitted extends Keys<Value, Ignore>, Ignore = never> =
    Value extends never
        ? Value
        : [Omitted] extends [
                (
                    Omitted extends unknown
                        ? (k: Omitted) => void
                        : never
                    ) extends (k: infer I) => void
                    ? I
                    : never
            ]
            ? Value extends ArrayOf
                ? {
                    [Key in keyof Value]: Omitted extends Keys<Value[Key], Ignore>
                        ? Value[Key] extends any
                            ? DeepOmit<Value[Key], Omitted, Ignore>
                            : never
                        : Value[Key]
                }
                : {
                    [Key in keyof Value as Omitted extends `${string}.${string}`
                        ? Key
                        : Key extends Omitted
                            ? never
                            : Key]: Omitted extends `${string}.${infer Rest}`
                        ? Rest extends Keys<Value[Key], Ignore>
                            ? DeepOmit<Value[Key], Rest, Ignore>
                            : Value[Key]
                        : Value[Key]
                }
            : UnionToTuple<Omitted> extends Array<Keys<Value, Ignore>>
                ? DeepOmitTuple<Value, UnionToTuple<Omitted>, Ignore>
                : never;

export type DateComponentArray =
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number]
    | [number, number, number, number, number, number]
    | [number, number, number, number, number, number, number];

export type DateLike =
    | number
    | string
    | Date
    | HTMLInputElement
    | Record<string, any>;

export const timeSymbol: unique symbol = Symbol.for("Time");
export type UnitTime = typeof timeSymbol;

export const yearSymbol: unique symbol = Symbol.for("Year");
export type UnitYear = typeof yearSymbol;

export const monthSymbol: unique symbol = Symbol.for("Month");
export type UnitMonth = typeof monthSymbol;

export const isoWeekSymbol: unique symbol = Symbol.for("ISOWeek");
export type UnitISOWeek = typeof isoWeekSymbol;

export const weekSymbol: unique symbol = Symbol.for("Week");
export type UnitWeek = typeof weekSymbol;

export const dateSymbol: unique symbol = Symbol.for("Date");
export type UnitDate = typeof dateSymbol;

export const hourSymbol: unique symbol = Symbol.for("Hour");
export type UnitHour = typeof hourSymbol;

export const minuteSymbol: unique symbol = Symbol.for("Minute");
export type UnitMinute = typeof minuteSymbol;

export const secondSymbol: unique symbol = Symbol.for("Second");
export type UnitSecond = typeof secondSymbol;

export const millisecondSymbol: unique symbol = Symbol.for("Millisecond");
export type UnitMillisecond = typeof millisecondSymbol;

export type DateComponents = {
    century: number,
    year: number,
    quarter: number,
    month: number,
    date: number,
    day: number,
    isoDay: number,
    week: number,
    isoWeek: number,
    dayOfYear: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number,
    time: number,
    offset: number,
    format: { [K in DateFormatKey]: string }
};

export interface DateExtension {
    source?: any,
    format?: string,
    valid: boolean
}

export type DateExtended = Date & DateExtension

export type PrimitiveTypeKey =
    | "string"
    | "number"
    | "boolean"
    | "bigint"
    | "symbol"
    | "undefined"
    | "object"
    | "function";

export type PrimitiveType<Key extends PrimitiveTypeKey> =
    Key extends "string"
        ? string
        : Key extends "number"
            ? number
            : Key extends "boolean"
                ? boolean
                : Key extends "bigint"
                    ? bigint
                    : Key extends "symbol"
                        ? symbol
                        : Key extends "undefined"
                            ? undefined
                            : Key extends "object"
                                ? object
                                : Key extends "function"
                                    ? Function
                                    : never;

export type DateUnit =
    | UnitTime
    | UnitYear
    | UnitMonth
    | UnitWeek
    | UnitISOWeek
    | UnitDate
    | UnitHour
    | UnitMinute
    | UnitSecond
    | UnitMillisecond;

export type Extensions =
    | "pdf"
    | "png"
    | "heic"
    | "jpeg"
    | "tiff"
    | "bmp"
    | "webp"
    | "gif"
    | "m3u"
    | "mp4"
    | "mkv"
    | "mp3"
    | "avi"
    | "wav"
    | "ogg"
    | "wmv"
    | "mov";

export type DateFormatKey =
    | "yyyyo"
    | "yyyy"
    | "yyo"
    | "yy"
    | "Qo"
    | "Q"
    | "MMMM"
    | "MMM"
    | "MM"
    | "Mo"
    | "M"
    | "DD"
    | "Do"
    | "D"
    | "dd"
    | "do"
    | "d"
    | "HH"
    | "Ho"
    | "H"
    | "hh"
    | "ho"
    | "h"
    | "mm"
    | "mo"
    | "m"
    | "SSS"
    | "ss"
    | "so"
    | "s"
    | "A"
    | "a"
    | "ZZ"
    | "Z"
    | "EEEE"
    | "EEE"
    | "X"
    | "x"
    | "WW"
    | "Wo"
    | "W"
    | "ww"
    | "wo"
    | "w"
    | "Eo"
    | "E"
    | "eo"
    | "e"
    | "N"
    | "n";

export type Base =
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36;

export type CSSStyle = Partial<Record<keyof Omit<CSSStyleDeclaration, "length" | "parentRule" | number | typeof Symbol.iterator> | string, string>>;

export type Language = typeof languages[keyof typeof languages];
