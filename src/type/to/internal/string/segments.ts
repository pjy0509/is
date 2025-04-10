import {$map} from "../../../utils/function/map";
import {
    LOWER_SURROGATE_END,
    LOWER_SURROGATE_START, REGIONAL_INDICATOR_E2_END, REGIONAL_INDICATOR_E2_START, REGIONAL_INDICATOR_E5_END, REGIONAL_INDICATOR_E5_SEQUENCE_END, REGIONAL_INDICATOR_E5_SEQUENCE_START, REGIONAL_INDICATOR_E5_START, SKIN_TONE_MODIFIER_END, SKIN_TONE_MODIFIER_START,
    UPPER_SURROGATE_END,
    UPPER_SURROGATE_START,
    VARIATION_SELECTOR_0_TO_16_END,
    VARIATION_SELECTOR_0_TO_16_START,
    VARIATION_SELECTOR_17_TO_256_END,
    VARIATION_SELECTOR_17_TO_256_START,
    ZERO_WIDTH_JOINER
} from "../../../utils/constant/unicode";
import {$converter} from "./converter";

export function $segments(x: string): string[] {
    x = $converter(x);

    try {
        if (Intl && Intl.Segmenter) {
            return $map([...new Intl.Segmenter(undefined, {granularity: "grapheme"}).segment(x)], segment => segment.segment);
        }
    } catch {
    }

    const arr: string[] = [];
    let i = 0;
    let segmentBuffer = "";
    let joinerBuffer = "";

    // helper
    const surrogatePair = (upper: number, lower: number) => ((upper - UPPER_SURROGATE_START) << 10) + (lower - LOWER_SURROGATE_START) + 0x10000;

    const isJoinable = (x: string) => /^(?=.*[\p{Extended_Pictographic}\p{Emoji_Presentation}])(?!.*\w).*$/u.test(x);

    const is2ByteVariationSelector = (code0: number) => code0 >= VARIATION_SELECTOR_0_TO_16_START && code0 <= VARIATION_SELECTOR_0_TO_16_END;

    const is4ByteVariationSelector = (pair0: number) => pair0 >= VARIATION_SELECTOR_17_TO_256_START && pair0 <= VARIATION_SELECTOR_17_TO_256_END;

    const isZeroWidthJoiner = (code0: number) => code0 === ZERO_WIDTH_JOINER;

    const isMarker = (code0: number) => /\p{M}/u.test(String.fromCharCode(code0));

    const isSurrogatePair = (code0: number, code1: number) => code0 >= UPPER_SURROGATE_START && code0 <= UPPER_SURROGATE_END && code1 >= LOWER_SURROGATE_START && code1 <= LOWER_SURROGATE_END;

    const isSkinToneModifier = (pair0: number) => pair0 >= SKIN_TONE_MODIFIER_START && pair0 <= SKIN_TONE_MODIFIER_END;

    const isRegionalIndicatorE2Sequence = (pair0: number) => pair0 >= REGIONAL_INDICATOR_E2_START && pair0 <= REGIONAL_INDICATOR_E2_END;

    const isRegionalIndicatorE5Start = (pair0: number) => pair0 === REGIONAL_INDICATOR_E5_START;

    const isRegionalIndicatorE5End = (pair0: number) => pair0 === REGIONAL_INDICATOR_E5_END;

    const isRegionalIndicatorE5Sequence = (pair0: number) => pair0 >= REGIONAL_INDICATOR_E5_SEQUENCE_START && pair0 <= REGIONAL_INDICATOR_E5_SEQUENCE_END;

    const take = (n: number) => {
        for (let j = 0; j < n; j++) {
            segmentBuffer += x[i++];
        }
    }

    const flush = (n: number) => {
        take(n);

        if (i < x.length) {
            const code0 = x[i].charCodeAt(0);

            if (is2ByteVariationSelector(code0) || isZeroWidthJoiner(code0) || isMarker(code0)) {
                // process variation selector (8byte) / zero width joiner / markers
                flush(1);
            }

            if (i + 1 < x.length) {
                const code1 = x[i + 1].charCodeAt(0);

                if (isSurrogatePair(code0, code1)) {
                    let pair0 = surrogatePair(code0, code1);

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
        const code0 = x[i].charCodeAt(0);

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
}