import {is} from "../core/is";
import {Language} from "../utils/types";
import {toString} from "../utils/functions";

export interface StringPredicate {
    (x: unknown): x is string;

    empty(x: unknown): boolean;

    lowerCase(x: unknown): boolean;

    upperCase(x: unknown): boolean;

    mixedCase(x: unknown): boolean;

    decimal(x: unknown): boolean;

    anyNumeric(x: unknown): boolean;

    allNumeric(x: unknown): boolean;

    notNumeric(x: unknown): boolean;

    anyAlphanumeric(x: unknown): boolean;

    allAlphanumeric(x: unknown): boolean;

    notAlphanumeric(x: unknown): boolean;

    anyEmoji(x: unknown): boolean;

    allEmoji(x: unknown): boolean;

    notEmoji(x: unknown): boolean;

    anyPunctuation(x: unknown): boolean;

    allPunctuation(x: unknown): boolean;

    notPunctuation(x: unknown): boolean;

    anySymbol(x: unknown): boolean;

    allSymbol(x: unknown): boolean;

    notSymbol(x: unknown): boolean;

    anyLanguage(x: unknown, ...languages: Array<Language>): boolean;

    allLanguage(x: unknown, ...languages: Array<Language>): boolean;

    notLanguage(x: unknown, ...languages: Array<Language>): boolean;

    anyMatch(x: unknown, regexp: RegExp): boolean;

    allMatch(x: unknown, regexp: RegExp): boolean;

    notMatch(x: unknown, regexp: RegExp): boolean;

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

        anyNumeric: function $anyNumeric(x: unknown): boolean {
            return is.string(x) ? /[0-9]+/.test(x) : is.string.anyNumeric(toString(x));
        },

        allNumeric: function $allNumeric(x: unknown): boolean {
            return is.string(x) ? /^[0-9]+$/.test(x) : is.string.allNumeric(toString(x));
        },

        notNumeric: function $notNumeric(x: unknown): boolean {
            return is.string.anyNumeric(x);
        },

        anyAlphanumeric: function $anyAlphanumeric(x: unknown): boolean {
            return is.string(x) ? /[a-zA-Z0-9]+/.test(x) : is.string.anyAlphanumeric(toString(x));
        },

        allAlphanumeric: function $allAlphanumeric(x: unknown): boolean {
            return is.string(x) ? /^[a-zA-Z0-9]+$/.test(x) : is.string.allAlphanumeric(toString(x));
        },

        notAlphanumeric: function $notAlphanumeric(x: unknown): boolean {
            return !is.string.anyAlphanumeric(x);
        },

        anyEmoji: function $anyEmoji(x: unknown): boolean {
            return is.string(x) ? /\p{Extended_Pictographic}|\u200D/u.test(x) : is.string.anyEmoji(toString(x));
        },

        allEmoji: function $allEmoji(x: unknown): boolean {
            return is.string(x) ? /^(?:\p{Extended_Pictographic}|\u200D)+$/u.test(x) : is.string.allEmoji(toString(x));
        },

        notEmoji: function $notEmoji(x: unknown): boolean {
            return !is.string.anyEmoji(x);
        },

        anyPunctuation: function $anyPunctuation(x: unknown): boolean {
            return is.string(x) ? /\p{P}/u.test(x) : is.string.anyPunctuation(toString(x));
        },

        allPunctuation: function $allPunctuation(x: unknown): boolean {
            return is.string(x) ? /^\p{P}+$/u.test(x) : is.string.allPunctuation(toString(x));
        },

        notPunctuation: function $notPunctuation(x: unknown): boolean {
            return !is.string.allPunctuation(x);
        },

        anySymbol: function $anySymbol(x: unknown): boolean {
            return is.string(x) ? /\p{S}/u.test(x) : is.string.anySymbol(toString(x));
        },

        allSymbol: function $allSymbol(x: unknown): boolean {
            return is.string(x) ? /^\p{S}+$/u.test(x) : is.string.allSymbol(toString(x));
        },

        notSymbol: function $notSymbol(x: unknown): boolean {
            return !is.string.anySymbol(x);
        },

        anyLanguage: function $containLanguage(x: unknown, ...languages: Array<Language>): boolean {
            return is.string(x) ? new RegExp("[\\d\\W\\p{M}" + languages.map(language => "\\p{Script=" + language.replace(/^(.)|(.*)/g, (match, p1, p2) => p1 ? p1.toUpperCase() : p2.toLowerCase()) + "}").join("") + "]", "u").test(x.normalize("NFC")) : is.string.anyLanguage(toString(x), ...languages);
        },

        allLanguage: function $allLanguage(x: unknown, ...languages: Array<Language>): boolean {
            return is.string(x) ? new RegExp("^[\\d\\W\\p{M}" + languages.map(language => "\\p{Script=" + language.replace(/^(.)|(.*)/g, (match, p1, p2) => p1 ? p1.toUpperCase() : p2.toLowerCase()) + "}").join("") + "]+$", "u").test(x.normalize("NFC")) : is.string.allLanguage(toString(x), ...languages);
        },

        notLanguage: function $notLanguage(x: unknown, ...languages: Array<Language>): boolean {
            return !is.string.anyLanguage(x, ...languages);
        },

        anyMatch: function $anyMatch(x: unknown, regexp: RegExp): boolean {
            return is.string(x) ? x.match(regexp) !== null : is.string.anyMatch(toString(x), regexp);
        },

        allMatch: function $allMatch(x: unknown, regexp: RegExp): boolean {
            if (!is.string(x)) return is.string.allMatch(toString(x), regexp);

            const matches: RegExpMatchArray | null = x.match(regexp);

            if (matches === null) return false;

            return x === matches[0];
        },

        notMatch: function $notMatch(x: unknown, regexp: RegExp): boolean {
            return !is.string.anyMatch(x, regexp);
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

function getCharType(x: number): number {
    if (x >= 97 && x <= 122) return 0;
    if (x >= 65 && x <= 90) return 1;
    if (x >= 48 && x <= 57) return 2;

    return -1;
}