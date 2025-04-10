import {$extensions} from "./extensions";

export function $webp(x: File): Promise<boolean> {
    return $extensions(x, "webp");
}