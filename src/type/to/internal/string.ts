import {surrogatePair, toString} from "../../utils/functions";
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

    bytes(x: unknown): Array<string>;

    segments(x: unknown): Array<string>;

    words(x: unknown): Array<string>;

    lines(x: unknown): Array<string>;
}

export const $string: StringConverter = Object.assign(
    function $string(x: unknown): string {
        return toString(x);
    },
    {
        bytes: function $bytes(x: unknown): Array<string> {
            if (!is.string(x)) return to.string.bytes(to.string(x));

            const bytes: Array<string> = [];

            for (let i = 0; i < x.length; i++) {
                bytes.push(x[i].charCodeAt(0).toString(16));
            }

            return bytes;
        },

        segments: function $segments(x: unknown): Array<string> {
            if (!is.string(x)) return to.string.segments(x);

            const $Intl: object = Intl;

            if (is.in($Intl, "Segmenter", "constructor")) return [...new $Intl.Segmenter(undefined, {granularity: "grapheme"}).segment(x)].map(segment => segment.segment);

            const arr: Array<string> = [];
            let i: number = 0;
            let segmentBuffer: string = "";
            let joinerBuffer: string = "";

            // helper
            const isJoinable: Function = (x: string) => {
                return /^(?=.*[\p{Extended_Pictographic}\p{Emoji_Presentation}])(?!.*\w).*$/u.test(x);
            }

            const is8ByteVariationSelector: Function = (code0: number): boolean => {
                return is.number.bt(code0, VARIATION_SELECTOR_0_TO_16_START, VARIATION_SELECTOR_0_TO_16_END);
            }

            const is16ByteVariationSelector: Function = (pair0: number): boolean => {
                return is.number.bt(pair0, VARIATION_SELECTOR_17_TO_256_START, VARIATION_SELECTOR_17_TO_256_END);
            }

            const isZeroWidthJoiner: Function = (code0: number): boolean => {
                return code0 === ZERO_WIDTH_JOINER;
            }

            const isMarker: Function = (code0: number): boolean => {
                return /\p{M}/u.test(String.fromCharCode(code0));
            }

            const isSurrogatePair: Function = (code0: number, code1: number): boolean => {
                return is.number.bt(code0, UPPER_SURROGATE_START, UPPER_SURROGATE_END) && is.number.bt(code1, LOWER_SURROGATE_START, LOWER_SURROGATE_END);
            }

            const isSkinToneModifier: Function = (pair0: number): boolean => {
                return is.number.bt(pair0, SKIN_TONE_MODIFIER_START, SKIN_TONE_MODIFIER_END);
            }

            const isRegionalIndicatorE2Sequence: Function = (pair0: number): boolean => {
                return is.number.bt(pair0, REGIONAL_INDICATOR_E2_START, REGIONAL_INDICATOR_E2_END);
            }

            const isRegionalIndicatorE5Start: Function = (pair0: number): boolean => {
                return pair0 === REGIONAL_INDICATOR_E5_START;
            }

            const isRegionalIndicatorE5End: Function = (pair0: number): boolean => {
                return pair0 === REGIONAL_INDICATOR_E5_END;
            }

            const isRegionalIndicatorE5Sequence: Function = (pair0: number): boolean => {
                return is.number.bt(pair0, REGIONAL_INDICATOR_E5_SEQUENCE_START, REGIONAL_INDICATOR_E5_SEQUENCE_END);
            }

            const take: Function = (n: number) => {
                for (let j = 0; j < n; j++) segmentBuffer += x[i++];
            }

            const flush: Function = (n: number) => {
                take(n);

                if (i < x.length) {
                    const code0: number = x[i].charCodeAt(0);

                    if (is8ByteVariationSelector(code0) || isZeroWidthJoiner(code0) || isMarker(code0)) {
                        // process variation selector (8byte) / zero width joiner / markers
                        flush(1);
                    }

                    if (i + 1 < x.length) {
                        const code1: number = x[i + 1].charCodeAt(0);

                        if (isSurrogatePair(code0, code1)) {
                            let pair0: number = surrogatePair(code0, code1);

                            if (is16ByteVariationSelector(pair0) || isSkinToneModifier(pair0)) {
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
                            if (isJoinable(segmentBuffer)) segmentBuffer = joinerBuffer + segmentBuffer;
                            else arr.push(joinerBuffer);

                            joinerBuffer = "";
                        }

                        arr.push(segmentBuffer);
                    }

                    segmentBuffer = "";
                }
            }

            while (i < x.length) {
                const code0 = x[i].charCodeAt(0);

                if (is8ByteVariationSelector(code0) || isZeroWidthJoiner(code0) || isMarker(code0)) {
                    // process variation selector (8byte) / zero width joiner / markers
                    flush(1);
                } else if (i + 1 < x.length) {
                    const code1 = x[i + 1].charCodeAt(0);

                    if (isSurrogatePair(code0, code1)) {
                        let pair0 = surrogatePair(code0, code1);

                        if (is16ByteVariationSelector(pair0)) {
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
                        flush(1);
                    }
                } else {
                    flush(1);
                }
            }

            return arr;
        },

        words: function $words(x: unknown): Array<string> {
            if (!is.string(x)) return to.string.words(to.string(x));

            return Array.from(x.match(/\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu) ?? []);
        },

        lines: function $lines(x: unknown): Array<string> {
            if (!is.string(x)) return to.string.lines(to.string(x));

            return x.split("\n");
        }
    }
)