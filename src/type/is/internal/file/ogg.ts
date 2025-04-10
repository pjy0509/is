import {$extensions} from "./extensions";

export function $ogg(x: File): Promise<boolean> {
    return $extensions(x, "ogg");
}