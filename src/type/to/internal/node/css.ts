import {CSSStyle} from "../../../utils/types";
import {$validSelector} from "../../../is/internal/node/validSelector";
import {$noop} from "../function/noop";
import {$validPseudo} from "../../../is/internal/node/validPseudo";
import {$string} from "./string";
import {$map} from "../../../utils/function/map";
import {$converter} from "../array/converter";
import {$style} from "./style";

export function $css(x: NodeList | HTMLCollection | Node | string | string[], style: CSSStyle, option?: { pseudo?: string, media?: string }) {
    if (typeof x === "string" && !$validSelector(x)) {
        return $noop;
    }

    if (option && option.pseudo && !$validPseudo(option.pseudo)) {
        return $noop;
    }

    if (x instanceof Node) {
        x = $string(x);
    }

    if (x instanceof NodeList || x instanceof HTMLCollection) {
        x = $map($converter(x), $string).join(",");
    }

    if (Array.isArray(x)) {
        x = x.join(",");
    }

    let rule = x;

    if (option && option.pseudo) {
        rule += option.pseudo;
    }

    rule += " { ";

    for (let [key, value] of Object.entries(style)) {
        key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        if (/^(webkit|ms|moz|o)-/i.test(key)) {
            key = "-" + key;
        }

        rule += key + ":" + value + ";";
    }

    rule += " }";

    if (option && option.media) {
        rule = "@media " +  option.media + " { " + rule + " }";
    }

    const length = $style.cssRules.length;
    const id =  $style.insertRule(rule, length);

    return () => {
        $style.deleteRule(id);
    }
}
