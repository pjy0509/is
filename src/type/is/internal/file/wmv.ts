import {$extensions} from "./extensions";

export function $wmv(x: File): Promise<boolean> {
    return $extensions(x, "wmv");
}