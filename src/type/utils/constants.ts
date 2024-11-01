import {Extensions} from "./types";
import {Signature} from "./Signature";

export const Window = (() => {
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (typeof globalThis !== 'undefined') return globalThis;
    // eslint-disable-next-line no-restricted-globals
    if (typeof self !== 'undefined') return self;
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

export const UPPER_SURROGATE_START = 0xD800;
export const UPPER_SURROGATE_END = 0xDBFF;
export const LOWER_SURROGATE_START = 0xDC00;
export const LOWER_SURROGATE_END = 0xDFFF;
export const VARIATION_SELECTOR_0_TO_16_START = 0xFE00;
export const VARIATION_SELECTOR_0_TO_16_END = 0xFE0F;
export const VARIATION_SELECTOR_17_TO_256_START = 0xE0100;
export const VARIATION_SELECTOR_17_TO_256_END = 0xE01EF;
export const ZERO_WIDTH_JOINER = 0x200D;
export const SKIN_TONE_MODIFIER_START = 0x1F3FB;
export const SKIN_TONE_MODIFIER_END = 0x1F3FF;
export const REGIONAL_INDICATOR_E2_START = 0x1F1E6;
export const REGIONAL_INDICATOR_E2_END = 0x1F1FF;
export const REGIONAL_INDICATOR_E5_START = 0x1F3F4;
export const REGIONAL_INDICATOR_E5_SEQUENCE_START = 0xE0061;
export const REGIONAL_INDICATOR_E5_SEQUENCE_END = 0xE007A;
export const REGIONAL_INDICATOR_E5_END = 0xE007F;

export const tags = {
    null: "[object Null]",
    undefined: "[object Undefined]",
    string: "[object String]",
    number: "[object Number]",
    bigint: "[object BigInt]",
    boolean: "[object Boolean]",
    symbol: "[object Symbol]",
    object: "[object Object]",
    function: "[object Function]",
    asyncFunction: "[object AsyncFunction]",
    generatorFunction: "[object GeneratorFunction]",
    asyncGeneratorFunction: "[object AsyncGeneratorFunction]",
    arguments: "[object Arguments]",
    array: "[object Array]",
    arrayBuffer: "[object ArrayBuffer]",
    dataView: "[object DataView]",
    uint8Array: "[object Uint8Array]",
    uint16Array: "[object Uint16Array]",
    uint32Array: "[object Uint32Array]",
    uint8ClampedArray: "[object Uint8ClampedArray]",
    bigUint64Array: "[object BigUint64Array]",
    int8Array: "[object Int8Array]",
    int16Array: "[object Int16Array]",
    int32Array: "[object Int32Array]",
    bigInt64Array: "[object BigInt64Array]",
    float32Array: "[object Float32Array]",
    float64Array: "[object Float64Array]",
    set: "[object Set]",
    map: "[object Map]",
    weakSet: "[object WeakSet]",
    weakMap: "[object WeakMap]",
    date: "[object Date]",
    regExp: "[object RegExp]",
    error: "[object Error]",
    file: "[object File]",
    blob: "[object Blob]",
};

export const signatures: { [Extension in Extensions]: Signature } = {
    pdf: new Signature(
        0,
        [['25', '50', '44', '46', '2d']]
    ),
    png: new Signature(
        0,
        [['89', '50', '4e', '47', '0d', '0a', '1a', '0a']]
    ),
    heic: new Signature(
        4,
        [['66', '74', '79', '70', '6d', '69', '66', '31'],
            ['66', '74', '79', '70', '6d', '73', '66', '31'],
            ['66', '74', '79', '70', '68', '65', '69', '63'],
            ['66', '74', '79', '70', '68', '65', '69', '78'],
            ['66', '74', '79', '70', '68', '65', '76', '63'],
            ['66', '74', '79', '70', '68', '65', '76', '78']]
    ),
    jpeg: new Signature(
        0,
        [["ff", "d8", "ff", "db"],
            ["ff", "d8", "ff", "e0", "00", "10", "4a", "46", "49", "46", "00", "01"],
            ["ff", "d8", "ff", "ee"],
            ["ff", "d8", "ff", "e1", "??", "??", "45", "78", "69", "66", "00", "00"],
            ["ff", "d8", "ff", "e0"]]
    ),
    tiff: new Signature(
        0,
        [["49", "49", "2a", "00"],
            ["4d", "4d", "00", "2a"],
            ["49", "49", "2b", "00"],
            ["4d", "4d", "00", "2b"]]
    ),
    bmp: new Signature(
        0,
        [["42", "4d"]]
    ),
    webp: new Signature(
        0,
        [["52", "49", "46", "46", "??", "??", "??", "??", "57", "45", "42", "50"]]
    ),
    gif: new Signature(
        0,
        [["47", "49", "46", "38", "37", "61"],
            ["47", "49", "46", "38", "39", "61"]]
    ),
    m3u: new Signature(
        0,
        [["23", "45", "58", "54", "4d", "33", "55"]]
    ),
    mp4: new Signature(
        4,
        [["66", "74", "79", "70", "69", "73", "6f", "6d"],
            ["66", "74", "79", "70", "4d", "53", "4e", "56"]]
    ),
    mkv: new Signature(
        0,
        [["1a", "45", "df", "a3"]]
    ),
    mp3: new Signature(
        0,
        [["ff", "fb"],
            ["ff", "f3"],
            ["ff", "f2"],
            ["49", "44", "33"]]
    ),
    avi: new Signature(
        0,
        [["52", "49", "46", "46", "??", "??", "??", "??", "41", "56", "49", "20"]]
    ),
    wav: new Signature(
        0,
        [["52", "49", "46", "46", "??", "??", "??", "??", "57", "41", "56", "45"]]
    ),
    ogg: new Signature(
        0,
        [["4f", "67", "67", "53"]]
    ),
    wmv: new Signature(
        0,
        [["30", "26", "b2", "75", "8e", "66", "cf", "11", "a6", "d9", "00", "aa", "00", "62", "ce", "6c"]]
    ),
    mov: new Signature(
        4,
        [["66", "74", "79", "70", "71", "74", "20", "20"],
            ["6d", "6f", "6f", "76"],
            ["66", "72", "65", "65"],
            ["6d", "64", "61", "74"],
            ["77", "69", "64", "65"]]
    )
};

export const noopClass = class NoopClass {};
