import {Extensions} from "../../utils/types";
import {$predicate} from "../internal/file/predicate";
import {$image} from "../internal/file/image";
import {$video} from "../internal/file/video";
import {$extensions} from "../internal/file/extensions";
import {$pdf} from "../internal/file/pdf";
import {$png} from "../internal/file/png";
import {$gif} from "../internal/file/gif";
import {$ogg} from "../internal/file/ogg";
import {$mp4} from "../internal/file/mp4";
import {$mkv} from "../internal/file/mkv";
import {$wmv} from "../internal/file/wmv";
import {$mov} from "../internal/file/mov";
import {$heic} from "../internal/file/heic";
import {$bmp} from "../internal/file/bmp";
import {$jpeg} from "../internal/file/jpeg";
import {$tiff} from "../internal/file/tiff";
import {$webp} from "../internal/file/webp";
import {$m3u} from "../internal/file/m3u";
import {$wav} from "../internal/file/wav";
import {$avi} from "../internal/file/avi";
import {$mp3} from "../internal/file/mp3";

export interface FilePredicate {
    (x: unknown): x is File;

    image(x: File): Promise<boolean>;

    video(x: File): Promise<boolean>;

    extensions(x: File, ...extensions: Extensions[]): Promise<boolean>;

    pdf(x: File): Promise<boolean>;

    png(x: File): Promise<boolean>;

    heic(x: File): Promise<boolean>;

    jpeg(x: File): Promise<boolean>;

    tiff(x: File): Promise<boolean>;

    bmp(x: File): Promise<boolean>;

    webp(x: File): Promise<boolean>;

    gif(x: File): Promise<boolean>;

    m3u(x: File): Promise<boolean>;

    mp4(x: File): Promise<boolean>;

    mkv(x: File): Promise<boolean>;

    mp3(x: File): Promise<boolean>;

    avi(x: File): Promise<boolean>;

    wav(x: File): Promise<boolean>;

    ogg(x: File): Promise<boolean>;

    wmv(x: File): Promise<boolean>;

    mov(x: File): Promise<boolean>;
}

export const $file: FilePredicate = Object.assign(
    $predicate,
    {
        image: $image,
        video: $video,
        extensions: $extensions,
        pdf: $pdf,
        png: $png,
        gif: $gif,
        ogg: $ogg,
        mp4: $mp4,
        mkv: $mkv,
        wmv: $wmv,
        mov: $mov,
        heic: $heic,
        bmp: $bmp,
        jpeg: $jpeg,
        tiff: $tiff,
        webp: $webp,
        m3u: $m3u,
        wav: $wav,
        avi: $avi,
        mp3: $mp3
    }
);