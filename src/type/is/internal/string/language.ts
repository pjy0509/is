import {Language} from "../../../utils/types";
import {$map} from "../../../utils/function/map";

export function $language(x: string, ...languages: Language[]): boolean {
    return new RegExp("^[\\d\\W\\p{M}" + $map(languages, language => "\\p{Script=" + language.description + "}").join("") + "]+$", "u").test(x.normalize("NFC"));
}
