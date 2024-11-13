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

export type JSONValue = string | number | boolean | null;

export type Range =
    | "()"
    | "(]"
    | "[)"
    | "[]";

export type ToArray<T>
    = T extends ArrayOf<infer E>
    ? E[]
    : T[];

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

export const unfixed: unique symbol = Symbol.for("Unfixed");
export type Unfixed = typeof unfixed;

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

export type HTMLElementObserverHandler = {
    attributes?: (target?: Node, oldValue?: { [K in string]: string | null } | null, newValue?: { [K in string]: string | null } | null) => void;
    data?: (target?: Node, oldValue?: string | null, newValue?: string | null) => void;
    children?: (target?: Node, removed?: Node[], added?: Node[]) => void;
    deep?: boolean;
};

export type FunctionObserverHandler = {
    apply?: (target?: (...args: any[]) => any, thisArg?: any, argArray?: any[]) => void;
};

export type ObjectObserverHandler = {
    get?: (target?: any, p?: string | symbol, value?: any) => void;
    set?: (target?: any, p?: string | symbol, oldValue?: any, newValue?: any) => void;
    delete?: (target?: any, p?: string | symbol, value?: any) => void;
    deep?: boolean;
};

export type Observable<T> = T & { revoke(): void };

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
    | "year"
    | "month"
    | "date"
    | "hour"
    | "minute"
    | "second"
    | "millisecond";

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

export type Language =
    | "Adlm"
    | "Afak"
    | "Aghb"
    | "Ahom"
    | "Arab"
    | "Aran"
    | "Armi"
    | "Armn"
    | "Avst"
    | "Bali"
    | "Bamu"
    | "Bass"
    | "Batk"
    | "Beng"
    | "Bhks"
    | "Blis"
    | "Bopo"
    | "Brah"
    | "Brai"
    | "Bugi"
    | "Buhd"
    | "Cakm"
    | "Cans"
    | "Cari"
    | "Cham"
    | "Cher"
    | "Chis"
    | "Chrs"
    | "Cirt"
    | "Copt"
    | "Cpmn"
    | "Cprt"
    | "Cyrl"
    | "Cyrs"
    | "Deva"
    | "Diak"
    | "Dogr"
    | "Dsrt"
    | "Dupl"
    | "Egyd"
    | "Egyh"
    | "Egyp"
    | "Elba"
    | "Elym"
    | "Ethi"
    | "Gara"
    | "Geok"
    | "Geor"
    | "Glag"
    | "Gong"
    | "Gonm"
    | "Goth"
    | "Gran"
    | "Grek"
    | "Gujr"
    | "Gukh"
    | "Guru"
    | "Hanb"
    | "Hang"
    | "Hani"
    | "Hano"
    | "Hans"
    | "Hant"
    | "Hatr"
    | "Hebr"
    | "Hira"
    | "Hluw"
    | "Hmng"
    | "Hmnp"
    | "Hrkt"
    | "Hung"
    | "Inds"
    | "Ital"
    | "Jamo"
    | "Java"
    | "Jpan"
    | "Jurc"
    | "Kali"
    | "Kana"
    | "Kawi"
    | "Khar"
    | "Khmr"
    | "Khoj"
    | "Kitl"
    | "Kits"
    | "Knda"
    | "Kore"
    | "Kpel"
    | "Krai"
    | "Kthi"
    | "Lana"
    | "Laoo"
    | "Latf"
    | "Latg"
    | "Latn"
    | "Leke"
    | "Lepc"
    | "Limb"
    | "Lina"
    | "Linb"
    | "Lisu"
    | "Loma"
    | "Lyci"
    | "Lydi"
    | "Mahj"
    | "Maka"
    | "Mand"
    | "Mani"
    | "Marc"
    | "Maya"
    | "Medf"
    | "Mend"
    | "Merc"
    | "Mero"
    | "Mlym"
    | "Modi"
    | "Mong"
    | "Moon"
    | "Mroo"
    | "Mtei"
    | "Mult"
    | "Mymr"
    | "Nagm"
    | "Nand"
    | "Narb"
    | "Nbat"
    | "Newa"
    | "Nkdb"
    | "Nkgb"
    | "Nkoo"
    | "Nshu"
    | "Ogam"
    | "Olck"
    | "Onao"
    | "Orkh"
    | "Orya"
    | "Osge"
    | "Osma"
    | "Ougr"
    | "Palm"
    | "Pauc"
    | "Pcun"
    | "Pelm"
    | "Perm"
    | "Phag"
    | "Phli"
    | "Phlp"
    | "Phlv"
    | "Phnx"
    | "Piqd"
    | "Plrd"
    | "Prti"
    | "Psin"
    | "Qaaa-Qabx"
    | "Ranj"
    | "Rjng"
    | "Rohg"
    | "Roro"
    | "Runr"
    | "Samr"
    | "Sara"
    | "Sarb"
    | "Saur"
    | "Sgnw"
    | "Shaw"
    | "Shrd"
    | "Shui"
    | "Sidd"
    | "Sidt"
    | "Sind"
    | "Sinh"
    | "Sogd"
    | "Sogo"
    | "Sora"
    | "Soyo"
    | "Sund"
    | "Sunu"
    | "Sylo"
    | "Syrc"
    | "Syre"
    | "Syrj"
    | "Syrn"
    | "Tagb"
    | "Takr"
    | "Tale"
    | "Talu"
    | "Taml"
    | "Tang"
    | "Tavt"
    | "Tayo"
    | "Telu"
    | "Teng"
    | "Tfng"
    | "Tglg"
    | "Thaa"
    | "Thai"
    | "Tibt"
    | "Tirh"
    | "Tnsa"
    | "Todr"
    | "Tols"
    | "Toto"
    | "Tutg"
    | "Ugar"
    | "Vaii"
    | "Visp"
    | "Vith"
    | "Wara"
    | "Wcho"
    | "Wole"
    | "Xpeo"
    | "Xsux"
    | "Yezi"
    | "Yiii"
    | "Zanb"
    | "Zinh"
    | "Zmth"
    | "Zsym"
    | "Zsye"
    | "Zxxx"
    | "Zyyy"
    | "Zzzz"
    | string;