import {Base} from "../../utils/types";
import {$converter} from "../internal/string/converter";
import {$bytes} from "../internal/string/bytes";
import {$segments} from "../internal/string/segments";
import {$words} from "../internal/string/words";
import {$lowerCase} from "../internal/string/lowerCase";
import {$upperCase} from "../internal/string/upperCase";
import {$capitalize} from "../internal/string/capitalize";
import {$uncapitalize} from "../internal/string/uncapitalize";
import {$camelCase} from "../internal/string/camelCase";
import {$pascalCase} from "../internal/string/pascalCase";
import {$kebabCase} from "../internal/string/kebabCase";
import {$snakeCase} from "../internal/string/snakeCase";
import {$titleCase} from "../internal/string/titleCase";
import {$pad} from "../internal/string/pad";
import {$padStart} from "../internal/string/padStart";
import {$padEnd} from "../internal/string/padEnd";
import {$trim} from "../internal/string/trim";
import {$trimStart} from "../internal/string/trimStart";
import {$trimEnd} from "../internal/string/trimEnd";
import {$deburr} from "../internal/string/deburr";
import {$deburrLatin} from "../internal/string/deburrLatin";
import {$deburrDigit} from "../internal/string/deburrDigit";
import {$escapeHTML} from "../internal/string/escapeHTML";
import {$unescapeHTML} from "../internal/string/unescapeHTML";
import {$escapeRegExp} from "../internal/string/escapeRegExp";
import {$radix} from "../internal/string/radix";

export interface StringConverter {
    (): string;

    (x: unknown): string;

    <T extends any[]>(...x: T): string;

    bytes(x: string): string[];

    segments(x: string): string[];

    words(x: string): string[];

    lowerCase<T extends string>(x: T): Lowercase<T>;

    upperCase<T extends string>(x: T): Uppercase<T>;

    capitalize<T extends string>(x: T): Capitalize<T>;

    uncapitalize<T extends string>(x: T): Uncapitalize<T>;

    camelCase(x: string): string;

    pascalCase(x: string): string;

    kebabCase(x: string): string;

    snakeCase(x: string): string;

    titleCase(x: string): string;

    pad(x: string, length: number, fill?: string): string;

    padStart(x: string, length: number, fill?: string): string;

    padEnd(x: string, length: number, fill?: string): string;

    trim(x: string, ...chars: string[]): string;

    trimStart(x: string, ...chars: string[]): string;

    trimStart(x: string, char1: string): string;

    trimStart(x: string, char1: string, char2: string): string;

    trimStart(x: string, char1: string, char2: string, char3: string): string;

    trimEnd(x: string, ...chars: string[]): string;

    trimEnd(x: string, char1: string): string;

    trimEnd(x: string, char1: string, char2: string): string;

    trimEnd(x: string, char1: string, char2: string, char3: string): string;

    deburr(x: string): string;

    deburrLatin(x: string): string;

    deburrDigit(x: string): string;

    escapeHTML(x: string): string;

    unescapeHTML(x: string): string;

    escapeRegExp(x: string): string;

    radix(x: number, base: Base): string;

    [Symbol.toStringTag]: string;
}

export const $string: StringConverter = Object.assign(
    $converter,
    {
        bytes: $bytes,
        segments: $segments,
        words: $words,
        lowerCase: $lowerCase,
        upperCase: $upperCase,
        capitalize: $capitalize,
        uncapitalize: $uncapitalize,
        camelCase: $camelCase,
        pascalCase: $pascalCase,
        kebabCase: $kebabCase,
        snakeCase: $snakeCase,
        titleCase: $titleCase,
        pad: $pad,
        padStart: $padStart,
        padEnd: $padEnd,
        trim: $trim,
        trimStart: $trimStart,
        trimEnd: $trimEnd,
        deburr: $deburr,
        deburrLatin: $deburrLatin,
        deburrDigit: $deburrDigit,
        escapeHTML: $escapeHTML,
        unescapeHTML: $unescapeHTML,
        escapeRegExp: $escapeRegExp,
        radix: $radix,

        [Symbol.toStringTag]: "To.String"
    }
)