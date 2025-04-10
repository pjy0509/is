import {Language} from "../../utils/types";
import {$predicate} from "../internal/string/predicate";
import {$languages} from "../internal/string/languages";
import {$empty} from "../internal/string/empty";
import {$lowerCase} from "../internal/string/lowerCase";
import {$upperCase} from "../internal/string/upperCase";
import {$mixedCase} from "../internal/string/mixedCase";
import {$decimal} from "../internal/string/decimal";
import {$numeric} from "../internal/string/numeric";
import {$alphanumeric} from "../internal/string/alphanumeric";
import {$emoji} from "../internal/string/emoji";
import {$punctuation} from "../internal/string/punctuation";
import {$symbol} from "../internal/string/symbol";
import {$marker} from "../internal/string/marker";
import {$language} from "../internal/string/language";
import {$repeated} from "../internal/string/repeated";
import {$sequential} from "../internal/string/sequential";
import {$index} from "../internal/string";

export interface StringPredicate {
    (x: unknown): x is string;

    languages: { [K in string]: Language };

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

    repeated(x: string, n: number): boolean;

    sequential(x: string, n: number): boolean;

    index(x: string): boolean;
}

export const $string: StringPredicate = Object.assign(
    $predicate,
    {
        languages: $languages,
        empty: $empty,
        lowerCase: $lowerCase,
        upperCase: $upperCase,
        mixedCase: $mixedCase,
        decimal: $decimal,
        numeric: $numeric,
        alphanumeric: $alphanumeric,
        emoji: $emoji,
        punctuation: $punctuation,
        symbol: $symbol,
        marker: $marker,
        language: $language,
        repeated: $repeated,
        sequential: $sequential,
        index: $index
    }
);
