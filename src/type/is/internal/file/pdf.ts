import {$extensions} from "./extensions";

export function $pdf(x: File): Promise<boolean> {
    return $extensions(x, "pdf");
}