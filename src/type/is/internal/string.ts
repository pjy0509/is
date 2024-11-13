import {is} from "../core/is";
import {Language} from "../../utils/types";

export interface StringPredicate {
    (x: unknown): x is string;

    empty(x: string): boolean;

    lowerCase(x: string): boolean;

    upperCase(x: string): boolean;

    mixedCase(x: string): boolean;

    decimal(x: string): boolean;

    numeric(x: string): boolean;

    alphanumeric(x: string): boolean;

    emoji(x: string): boolean;

    punctuation(x: string): boolean;

    symbol(x: string): boolean;

    marker(x: string): boolean;

    language(x: string, ...languages: Language[]): boolean;

    match(x: string, regexp: RegExp): boolean;

    test(x: string, regexp: RegExp): boolean;

    repeated(x: string, n: number): boolean;

    sequential(x: string, n: number): boolean;

    index(x: string): boolean;
}

export const $string: StringPredicate = Object.assign(
    function $string(x: unknown): x is string {
        return typeof x === "string";
    },
    {
        empty: function $empty(x: string): boolean {
            return !x.length;
        },

        lowerCase: function $lowerCase(x: string): boolean {
            return /^[^A-Z]*$/.test(x);
        },

        upperCase: function $upperCase(x: string): boolean {
            return /^[^a-z]*$/.test(x);
        },

        mixedCase: function $mixedCase(x: string): boolean {
            return /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(x);
        },

        decimal: function $numeric(x: string): boolean {
            return /^\s*?(-?\d*\.?\d*)(e-?\d*\.?\d*)?\s*?$/.test(x);
        },

        numeric: function $numeric(x: string): boolean {
            return /^[0-9]+$/.test(x);
        },

        alphanumeric: function $alphanumeric(x: string): boolean {
            return /^[a-zA-Z0-9]+$/.test(x);
        },

        emoji: function $emoji(x: string): boolean {
            // /^((subdivision-flag)|(keycap)|(else))$/u
            return /^(?:\uD83C\uDFF4[\uDB40\uDC61\uDB40\uDC62\uDB40\uDC63\uDB40\uDC64\uDB40\uDC65\uDB40\uDC66\uDB40\uDC67\uDB40\uDC68\uDB40\uDC69\uDB40\uDC6A\uDB40\uDC6B\uDB40\uDC6C\uDB40\uDC6D\uDB40\uDC6E\uDB40\uDC6F\uDB40\uDC70\uDB40\uDC71\uDB40\uDC72\uDB40\uDC73\uDB40\uDC74\uDB40\uDC75\uDB40\uDC76\uDB40\uDC77\uDB40\uDC78\uDB40\uDC79\uDB40\uDC7A]*\uDB40\uDC7F|[\u0030-\u0039\u0023\u002A][\uFE00-\uFE0F]?\u20E3|(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?(?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?)?)+)$/u.test(x);
        },

        punctuation: function $punctuation(x: string): boolean {
            return /^\p{P}+$/u.test(x);
        },

        symbol: function $symbol(x: string): boolean {
            return /^\p{S}+$/u.test(x);
        },

        marker: function $marker(x: string): boolean {
            return /^\p{M}+$/u.test(x);
        },

        language: function $language(x: string, ...languages: Language[]): boolean {
            return new RegExp("^[\\d\\W\\p{M}" + languages.map(language => "\\p{Script=" + language.replace(/^(.)|(.*)/g, (_, p1, p2): string => p1 ? p1.toUpperCase() : p2.toLowerCase()) + "}").join("") + "]+$", "u").test(x.normalize("NFC"));
        },

        match: function $match(x: string, regexp: RegExp): boolean {
            return x.match(regexp) !== null;
        },

        test: function $test(x: string, regexp: RegExp): boolean {
            return regexp.test(x);
        },

        repeated: function $repeated(x: string, n: number): boolean {
            return n <= 1 ? true : new RegExp("(.)\\1{" + (n - 1) + ",}").test(x);
        },

        sequential: function $sequential(x: string, n: number): boolean {
            if (n <= 1 || x.length < n) {
                return false;
            }

            // helper
            const getCharType: (...args: any[]) => any = (x: number): number => x >= 97 && x <= 122 ? 0 : x >= 65 && x <= 90 ? 1 : x >= 48 && x <= 57 ? 2 : -1;

            const a: string[] = Array.prototype.slice.call(x);

            return a.some((_, i: number) => {
                if (i > a.length - n) {
                    return false;
                }

                const p: number = getCharType(a[i].charCodeAt(0));

                if (p === -1) {
                    return false;
                }

                return [1, -1].some(d => {
                    return a.slice(i, i + n).every((s, j) => {
                        const c: number = s.charCodeAt(0);

                        return getCharType(c) === p && c === a[i].charCodeAt(0) + d * j;
                    });
                });
            });
        },

        index: function $index(x: string): boolean {
            return is.string.test(x, /^(?:0|[1-9]\d*)$/);
        },
    }
);