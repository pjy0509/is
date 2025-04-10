import {to} from "../../core/to";

export function $words(x: string): string[] {
    const segments = to.string.segments(x);
    const words = [];
    let i = 0;
    let buffer = "";

    // helper
    const isNormalNumber = (char: string) => /^[0-9]$/.test(char);

    const isFullWidthNumber = (char: string) => /^[\uff10-\uff19]$/.test(char);

    const isGlyphVariantNumber = (char: string) => /^[0-9]\ufe0f$/.test(char);

    const isKeycapNumber = (char: string) => /^[0-9]\ufe0f\u20e3$/.test(char);

    const isSubscriptsNumber = (char: string) => /^[\u2080-\u2089]$/.test(char);

    const isSuperscriptsNumber = (char: string) => /^[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]$/.test(char);

    const isMathematicalBoldNumber = (char: string) => /^\ud835[\udfce-\udfd7]$/.test(char);

    const isMathematicalDoubleStruck = (char: string) => /^\ud835[\udfd8-\udfe1]$/.test(char);

    const isMathematicalSansSerif = (char: string) => /^\ud835[\udfe2-\udfeb]$/.test(char);

    const isMathematicalSansSerifBold = (char: string) => /^\ud835[\udfec-\udff5]$/.test(char);

    const isMathematicalMonospace = (char: string) => /^\ud835[\udff6-\udfff]$/.test(char);

    const isLetterUpperCase = (char: string) => /\p{Lu}/u.test(char);

    const isLetterLowerCase = (char: string) => /\p{Ll}/u.test(char);

    const isSpace = (char: string) => /[\p{Z}\-_]/u.test(char);

    while (i < segments.length) {
        if (isLetterUpperCase(segments[i])) {
            buffer += segments[i++];

            if (i < segments.length && isLetterLowerCase(segments[i])) {
                // Xxx...
                while (i < segments.length && isLetterLowerCase(segments[i])) buffer += segments[i++];
            } else {
                // XXX...
                while (i < segments.length && isLetterUpperCase(segments[i]) && (i + 1 === segments.length || !isLetterLowerCase(segments[i + 1]))) buffer += segments[i++];
            }
        } else if (isLetterLowerCase(segments[i])) {
            // xxx...
            while (i < segments.length && isLetterLowerCase(segments[i])) buffer += segments[i++];
        } else if (isNormalNumber(segments[i])) {
            // 012...
            while (i < segments.length && isNormalNumber(segments[i])) buffer += segments[i++];
        } else if (isFullWidthNumber(segments[i])) {
            // ０１２...
            while (i < segments.length && isFullWidthNumber(segments[i])) buffer += segments[i++];
        } else if (isGlyphVariantNumber(segments[i])) {
            // 0️1️2️...
            while (i < segments.length && isGlyphVariantNumber(segments[i])) buffer += segments[i++];
        } else if (isKeycapNumber(segments[i])) {
            // 0️⃣1️⃣2️⃣...
            while (i < segments.length && isKeycapNumber(segments[i])) buffer += segments[i++];
        } else if (isSubscriptsNumber(segments[i])) {
            // ₀₁₂...
            while (i < segments.length && isSubscriptsNumber(segments[i])) buffer += segments[i++];
        } else if (isSuperscriptsNumber(segments[i])) {
            // ⁰¹²...
            while (i < segments.length && isSuperscriptsNumber(segments[i])) buffer += segments[i++];
        } else if (isMathematicalBoldNumber(segments[i])) {
            // 𝟎𝟏𝟐...
            while (i < segments.length && isMathematicalBoldNumber(segments[i])) buffer += segments[i++];
        } else if (isMathematicalDoubleStruck(segments[i])) {
            // 𝟘𝟙𝟚...
            while (i < segments.length && isMathematicalDoubleStruck(segments[i])) buffer += segments[i++];
        } else if (isMathematicalSansSerif(segments[i])) {
            // 𝟢𝟣𝟤...
            while (i < segments.length && isMathematicalSansSerif(segments[i])) buffer += segments[i++];
        } else if (isMathematicalSansSerifBold(segments[i])) {
            // 𝟬𝟭𝟮...
            while (i < segments.length && isMathematicalSansSerifBold(segments[i])) buffer += segments[i++];
        } else if (isMathematicalMonospace(segments[i])) {
            // 𝟶𝟷𝟸...
            while (i < segments.length && isMathematicalMonospace(segments[i])) buffer += segments[i++];
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
}