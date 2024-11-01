import {is} from "../core/is";
import {Language} from "../../utils/types";
import {getCharType, toString} from "../../utils/functions";

export interface StringPredicate {
    (x: unknown): x is string;

    empty(x: unknown): boolean;

    lowerCase(x: unknown): boolean;

    upperCase(x: unknown): boolean;

    mixedCase(x: unknown): boolean;

    decimal(x: unknown): boolean;

    numeric(x: unknown): boolean;

    alphanumeric(x: unknown): boolean;

    emoji(x: unknown): boolean;

    punctuation(x: unknown): boolean;

    symbol(x: unknown): boolean;

    language(x: unknown, ...languages: Array<Language>): boolean;

    match(x: unknown, regexp: RegExp): boolean;

    test(x: unknown, regexp: RegExp): boolean;

    repeated(x: unknown, n: number): boolean;

    sequential(x: unknown, n: number): boolean;

    index(x: unknown): boolean;
}

export const $string: StringPredicate = Object.assign(
    function $string(x: unknown): x is string {
        return typeof x === "string";
    },
    {
        empty: function $empty(x: unknown): boolean {
            return is.string(x) ? !x.length : is.string.empty(toString(x));
        },

        lowerCase: function $lowerCase(x: unknown): boolean {
            return is.string(x) ? /^[^A-Z]*$/.test(x) : is.string.lowerCase(toString(x));
        },

        upperCase: function $upperCase(x: unknown): boolean {
            return is.string(x) ? /^[^a-z]*$/.test(x) : is.string.upperCase(toString(x));
        },

        mixedCase: function $mixedCase(x: unknown): boolean {
            return is.string(x) ? /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(x) : is.string.mixedCase(toString(x));
        },

        decimal: function $numeric(x: unknown): boolean {
            return is.string(x) ? /^\s*?(-?\d*\.?\d*)(e-?\d*\.?\d*)?\s*?$/.test(x) : is.string.decimal(toString(x));
        },

        numeric: function $numeric(x: unknown): boolean {
            return is.string(x) ? /^[0-9]+$/.test(x) : is.string.numeric(toString(x));
        },

        alphanumeric: function $alphanumeric(x: unknown): boolean {
            return is.string(x) ? /^[a-zA-Z0-9]+$/.test(x) : is.string.alphanumeric(toString(x));
        },

        emoji: function $emoji(x: unknown): boolean {
            return is.string(x) ? /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u200D)+$/u.test(x) : is.string.emoji(toString(x));
        },

        punctuation: function $punctuation(x: unknown): boolean {
            return is.string(x) ? /^\p{P}+$/u.test(x) : is.string.punctuation(toString(x));
        },

        symbol: function $symbol(x: unknown): boolean {
            return is.string(x) ? /^\p{S}+$/u.test(x) : is.string.symbol(toString(x));
        },

        language: function $language(x: unknown, ...languages: Array<Language>): boolean {
            return is.string(x) ? new RegExp("^[\\d\\W\\p{M}" + languages.map(language => "\\p{Script=" + language.replace(/^(.)|(.*)/g, (match, p1, p2) => p1 ? p1.toUpperCase() : p2.toLowerCase()) + "}").join("") + "]+$", "u").test(x.normalize("NFC")) : is.string.language(toString(x), ...languages);
        },

        match: function $match(x: unknown, regexp: RegExp): boolean {
            return is.string(x) ? x.match(regexp) !== null : is.string.match(toString(x), regexp);
        },

        test: function $test(x: unknown, regexp: RegExp): boolean {
            return is.string(x) ? regexp.test(x) : is.string.test(toString(x), regexp);
        },

        repeated: function $repeated(x: unknown, n: number): boolean {
            return n <= 1 ? true : is.string(x) ? new RegExp("(.)\\1{" + (n - 1) + ",}").test(x) : is.string.repeated(toString(x), n);
        },

        sequential: function $sequential(x: unknown, n: number): boolean {
            if (!is.string(x)) return is.string.sequential(toString(x), n);

            if (n <= 1 || x.length < n) return false;

            const a: Array<string> = Array.from(x);

            return a.some((_, i) => {
                if (i > a.length - n) return false;

                const p: number = getCharType(a[i].charCodeAt(0));

                if (p === -1) return false;

                return [1, -1].some(d => {
                    return a.slice(i, i + n).every((s, j) => {
                        const c: number = s.charCodeAt(0);

                        return getCharType(c) === p && c === a[i].charCodeAt(0) + d * j;
                    });
                });
            });
        },

        index: function $index(x: unknown): boolean {
            return is.string(x) ? is.string.test(x, /^(?:0|[1-9]\d*)$/) : is.string.index(toString(x));
        },
    }
);