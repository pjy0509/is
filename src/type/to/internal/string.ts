import {is} from "../../is/core/is";
import {to} from "../core/to";
import {
    LOWER_SURROGATE_END,
    LOWER_SURROGATE_START, REGIONAL_INDICATOR_E2_END, REGIONAL_INDICATOR_E2_START, REGIONAL_INDICATOR_E5_END, REGIONAL_INDICATOR_E5_SEQUENCE_END, REGIONAL_INDICATOR_E5_SEQUENCE_START, REGIONAL_INDICATOR_E5_START, SKIN_TONE_MODIFIER_END,
    SKIN_TONE_MODIFIER_START,
    UPPER_SURROGATE_END,
    UPPER_SURROGATE_START,
    VARIATION_SELECTOR_0_TO_16_END,
    VARIATION_SELECTOR_0_TO_16_START,
    VARIATION_SELECTOR_17_TO_256_END,
    VARIATION_SELECTOR_17_TO_256_START,
    ZERO_WIDTH_JOINER
} from "../../utils/constants";

export interface StringConverter {
    (x: unknown): string;

    bytes(x: string): string[];

    segments(x: string): string[];

    words(x: string): string[];

    lines(x: string): string[];

    lowercase<T extends string>(x: T): Lowercase<T>;

    uppercase<T extends string>(x: T): Uppercase<T>;

    capitalize<T extends string>(x: T): Capitalize<T>;

    uncapitalize<T extends string>(x: T): Uncapitalize<T>;

    camelcase(x: string): string;

    pascalcase(x: string): string;

    kebabcase(x: string): string;

    snakecase(x: string): string;

    titlecase(x: string): string;

    pad(x: string, length: number, fill?: string): string;

    padStart(x: string, length: number, fill?: string): string;

    padEnd(x: string, length: number, fill?: string): string;

    trim(x: string, ...chars: string[]): string;

    trimStart(x: string, char1: string): string;

    trimStart(x: string, char1: string, char2: string): string;

    trimStart(x: string, char1: string, char2: string, char3: string): string;

    trimStart(x: string, ...chars: string[]): string;

    trimEnd(x: string, char1: string): string;

    trimEnd(x: string, char1: string, char2: string): string;

    trimEnd(x: string, char1: string, char2: string, char3: string): string;

    trimEnd(x: string, ...chars: string[]): string;
}

export const $string: StringConverter = Object.assign(
    function $string(x: unknown): string {
        return typeof x === "string" ? x : is.array.like(x) ? to.object.values(x) + "" : x + "";
    },
    {
        bytes: function $bytes(x: string): string[] {
            const bytes: string[] = [];

            for (let i: number = 0; i < x.length; i++) {
                bytes.push(x[i].charCodeAt(0).toString(16));
            }

            return bytes;
        },

        segments: function $segments(x: string): string[] {
            const $Intl: object = Intl;

            if (is.in($Intl, "Segmenter", "constructor")) {
                return [...new $Intl.Segmenter(undefined, {granularity: "grapheme"}).segment(x)].map(segment => segment.segment);
            }

            const arr: string[] = [];
            let i: number = 0;
            let segmentBuffer: string = "";
            let joinerBuffer: string = "";

            // helper
            const surrogatePair: (...args: any[]) => any = (upper: number, lower: number): number => ((upper - UPPER_SURROGATE_START) << 10) + (lower - LOWER_SURROGATE_START) + 0x10000;

            const isJoinable: (...args: any[]) => any = (x: string) => /^(?=.*[\p{Extended_Pictographic}\p{Emoji_Presentation}])(?!.*\w).*$/u.test(x);

            const is2ByteVariationSelector: (...args: any[]) => any = (code0: number): boolean => is.number.bt(code0, VARIATION_SELECTOR_0_TO_16_START, VARIATION_SELECTOR_0_TO_16_END);

            const is4ByteVariationSelector: (...args: any[]) => any = (pair0: number): boolean => is.number.bt(pair0, VARIATION_SELECTOR_17_TO_256_START, VARIATION_SELECTOR_17_TO_256_END);

            const isZeroWidthJoiner: (...args: any[]) => any = (code0: number): boolean => code0 === ZERO_WIDTH_JOINER;

            const isMarker: (...args: any[]) => any = (code0: number): boolean => /\p{M}/u.test(String.fromCharCode(code0));

            const isSurrogatePair: (...args: any[]) => any = (code0: number, code1: number): boolean => is.number.bt(code0, UPPER_SURROGATE_START, UPPER_SURROGATE_END) && is.number.bt(code1, LOWER_SURROGATE_START, LOWER_SURROGATE_END);

            const isSkinToneModifier: (...args: any[]) => any = (pair0: number): boolean => is.number.bt(pair0, SKIN_TONE_MODIFIER_START, SKIN_TONE_MODIFIER_END);

            const isRegionalIndicatorE2Sequence: (...args: any[]) => any = (pair0: number): boolean => is.number.bt(pair0, REGIONAL_INDICATOR_E2_START, REGIONAL_INDICATOR_E2_END);

            const isRegionalIndicatorE5Start: (...args: any[]) => any = (pair0: number): boolean => pair0 === REGIONAL_INDICATOR_E5_START;

            const isRegionalIndicatorE5End: (...args: any[]) => any = (pair0: number): boolean =>  pair0 === REGIONAL_INDICATOR_E5_END;

            const isRegionalIndicatorE5Sequence: (...args: any[]) => any = (pair0: number): boolean => is.number.bt(pair0, REGIONAL_INDICATOR_E5_SEQUENCE_START, REGIONAL_INDICATOR_E5_SEQUENCE_END);

            const take: (...args: any[]) => any = (n: number) => {
                for (let j: number = 0; j < n; j++) {
                    segmentBuffer += x[i++];
                }
            }

            const flush: (...args: any[]) => any = (n: number) => {
                take(n);

                if (i < x.length) {
                    const code0: number = x[i].charCodeAt(0);

                    if (is2ByteVariationSelector(code0) || isZeroWidthJoiner(code0) || isMarker(code0)) {
                        // process variation selector (8byte) / zero width joiner / markers
                        flush(1);
                    }

                    if (i + 1 < x.length) {
                        const code1: number = x[i + 1].charCodeAt(0);

                        if (isSurrogatePair(code0, code1)) {
                            let pair0: number = surrogatePair(code0, code1);

                            if (is4ByteVariationSelector(pair0) || isSkinToneModifier(pair0)) {
                                // process variation selector (16byte) / skin tone modifier
                                flush(2);
                            }
                        }
                    }
                }

                if (segmentBuffer !== "") {
                    if (segmentBuffer.endsWith("\u200D") && isJoinable(segmentBuffer)) {
                        joinerBuffer += segmentBuffer;
                    } else {
                        if (joinerBuffer) {
                            if (isJoinable(segmentBuffer)) {
                                segmentBuffer = joinerBuffer + segmentBuffer;
                            } else {
                                arr.push(joinerBuffer);
                            }

                            joinerBuffer = "";
                        }

                        arr.push(segmentBuffer);
                    }

                    segmentBuffer = "";
                }
            }

            while (i < x.length) {
                const code0: number = x[i].charCodeAt(0);

                if (is2ByteVariationSelector(code0) || isZeroWidthJoiner(code0) || isMarker(code0)) {
                    // process variation selector (8byte) / zero width joiner / markers
                    flush(1);
                } else if (i + 1 < x.length) {
                    const code1 = x[i + 1].charCodeAt(0);

                    if (isSurrogatePair(code0, code1)) {
                        let pair0 = surrogatePair(code0, code1);

                        if (is4ByteVariationSelector(pair0)) {
                            // process variation selector (16byte)
                            flush(2);
                        } else if (isRegionalIndicatorE2Sequence(pair0)) {
                            if (i + 3 < x.length) {
                                const code2 = x[i + 2].charCodeAt(0);
                                const code3 = x[i + 3].charCodeAt(0);

                                if (isSurrogatePair(code2, code3)) {
                                    const pair1 = surrogatePair(code2, code3);

                                    if (isRegionalIndicatorE2Sequence(pair1)) {
                                        // process regional indicator e2.0
                                        flush(4);
                                        continue;
                                    }
                                }
                            }

                            flush(2);
                        } else if (isRegionalIndicatorE5Start(pair0)) {
                            // process regional indicator e5.0
                            take(2);

                            while (true) {
                                if (i + 1 < x.length) {
                                    const code0 = x[i].charCodeAt(0);
                                    const code1 = x[i + 1].charCodeAt(0);

                                    if (isSurrogatePair(code0, code1)) {
                                        pair0 = surrogatePair(code0, code1);

                                        if (isRegionalIndicatorE5Sequence(pair0)) {
                                            take(2);
                                        } else if (isRegionalIndicatorE5End(pair0)) {
                                            flush(2);
                                        } else {
                                            break;
                                        }
                                    } else {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }

                            flush(0);
                        } else {
                            flush(2);
                        }
                    } else {
                        flush(1);
                    }
                } else {
                    flush(1);
                }
            }

            return arr;
        },

        words: function $words(x: string): string[] {
            const segments: string[] = to.string.segments(x);
            const words: string[] = [];
            let i: number = 0;
            let buffer: string = "";

            // helper
            const isNumber: (...args: any[]) => any = (char: string): boolean => /\p{N}/u.test(char);

            const isLetterUppercase: (...args: any[]) => any = (char: string): boolean => /\p{Lu}/u.test(char);

            const isLetterLowercase: (...args: any[]) => any = (char: string): boolean => /\p{Ll}/u.test(char);

            const isSpace: (...args: any[]) => any = (char: string): boolean => /[\p{Z}\-_]/u.test(char);

            while (i < segments.length) {
                if (isLetterUppercase(segments[i])) {
                    buffer += segments[i++];

                    if (i < segments.length && isLetterLowercase(segments[i])) {
                        // Xxx...
                        while (i < segments.length && isLetterLowercase(segments[i])) buffer += segments[i++];
                    } else {
                        // XXX...
                        while (i < segments.length && isLetterUppercase(segments[i])) buffer += segments[i++];
                    }
                } else if (isLetterLowercase(segments[i])) {
                    // xxx...
                    while (i < segments.length && isLetterLowercase(segments[i])) buffer += segments[i++];
                } else if (isNumber(segments[i])) {
                    // 000...
                    while (i < segments.length && isNumber(segments[i])) buffer += segments[i++];
                } else if (isSpace(segments[i])) {
                    i++;
                    continue;
                } else {
                    buffer += segments[i++];
                }

                words.push(buffer);
                buffer = "";
            }

            return words;
        },

        lines: function $lines(x: string): string[] {
            return x.split("\n");
        },

        lowercase: function $lowercase<T extends string>(x: string): Lowercase<T> {
            return x.toLowerCase() as Lowercase<T>;
        },

        uppercase: function $uppercase<T extends string>(x: string): Uppercase<T> {
            return x.toUpperCase() as Uppercase<T>;
        },

        capitalize: function $capitalize<T extends string>(x: string): Capitalize<T> {
            return to.string.uppercase(x.charAt(0)) + to.string.lowercase(x.slice(1)) as Capitalize<T>;
        },

        uncapitalize: function $uncapitalize<T extends string>(x: string): Uncapitalize<T> {
            return to.string.lowercase(x.charAt(0)) + to.string.uppercase(x.slice(1)) as Uncapitalize<T>;
        },

        camelcase: function $camelcase(x: string): string {
            const words: string[] = to.string.words(x);

            if (is.array.empty(words)) {
                return "";
            }

            const [first, ...rest] = words;

            return first + rest.map(to.string.capitalize).join("");
        },

        pascalcase: function $pascalcase(x: string): string {
            const words: string[] = to.string.words(x);

            if (is.array.empty(words)) {
                return "";
            }

            return words.map(to.string.capitalize).join("");
        },

        kebabcase: function $kebabcase(x: string): string {
            const words: string[] = to.string.words(x);

            if (is.array.empty(words)) {
                return "";
            }

            return words.map(to.string.lowercase).join("-");
        },

        snakecase: function $snakecase(x: string): string {
            const words: string[] = to.string.words(x);

            if (is.array.empty(words)) {
                return "";
            }

            return words.map(to.string.lowercase).join("_");
        },

        titlecase: function $titlecase(x: string): string {
            const words: string[] = to.string.words(x);

            if (is.array.empty(words)) {
                return "";
            }

            return words.map(to.string.capitalize).join(" ");
        },

        pad: function $pad(x: string, length: number, fill: string = " "): string {
            return x.padStart(Math.floor((length - x.length) / 2) + x.length, fill).padEnd(length, fill);
        },

        padStart: function $padStart(x: string, length: number, fill: string = " "): string {
            return x.padStart(length, fill);
        },

        padEnd: function $padEnd(x: string, length: number, fill: string = " "): string {
            return x.padEnd(length, fill);
        },

        trim: function $trim(x: string, ...chars: string[]): string {
            return to.string.trimStart(to.string.trimEnd(x, ...chars), ...chars);
        },

        trimStart: function $trimStart(x: string, ...chars: string[]): string {
            let i: number = 0;

            if (chars.length === 0) {
                return x.trimEnd();
            } else if (chars.length === 1) {
                while (i < x.length && x[i] === chars[0]) i++;
            } else if (chars.length === 2) {
                while (i < x.length && (x[i] === chars[0] || x[i] === chars[1])) i++;
            } else if (chars.length === 3) {
                while (i < x.length && (x[i] === chars[0] || x[i] === chars[1] || x[i] === chars[2])) i++;
            } else {
                while (i < x.length && chars.includes(x[i - 1])) i++;
            }

            return x.substring(i);
        },

        trimEnd: function $trimEnd(x: string, ...chars: string[]): string {
            let i: number = x.length;

            if (chars.length === 0) {
                return x.trimEnd();
            } else if (chars.length === 1) {
                while (i > 0 && x[i - 1] === chars[0]) i--;
            } else if (chars.length === 2) {
                while (i > 0 && (x[i - 1] === chars[0] || x[i - 1] === chars[1])) i--;
            } else if (chars.length === 3) {
                while (i > 0 && (x[i - 1] === chars[0] || x[i - 1] === chars[1] || x[i - 1] === chars[2])) i--;
            } else {
                while (i > 0 && chars.includes(x[i - 1])) i--;
            }

            return x.substring(0, i);
        }
    }
)