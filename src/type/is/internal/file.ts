import {is} from "../core/is";
import {Extensions} from "../../utils/types";
import {signatures} from "../../utils/constants";
import {Signature} from "../../utils/Signature";

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
    function $file(x: unknown): x is File {
        return x instanceof File;
    },
    {
        image: function $image(x: File): Promise<boolean> {
            const image: HTMLImageElement = new Image();
            const url: string = URL.createObjectURL(x);

            return new Promise(resolve => {
                image.onload = () => {
                    resolve(true);
                    URL.revokeObjectURL(url);
                };

                image.onerror = () => {
                    resolve(false);
                    URL.revokeObjectURL(url);
                };

                image.src = url;
            });
        },

        video: function $video(x: File): Promise<boolean> {
            const video: HTMLVideoElement = document.createElement("video");
            const url: string = URL.createObjectURL(x);

            return new Promise(resolve => {
                video.onloadeddata = () => {
                    resolve(true);
                    URL.revokeObjectURL(url);
                };

                video.onerror = () => {
                    resolve(false);
                    URL.revokeObjectURL(url);
                };

                video.src = url;
            });
        },

        extensions: function $extensions(x: File, ...extensions: Extensions[]): Promise<boolean> {
            return Signature.merge(extensions.map(extension => signatures[extension])).check(x);
        },

        pdf: function $pdf(x: File): Promise<boolean> {
            return is.file.extensions(x, "pdf");
        },

        png: function $png(x: File): Promise<boolean> {
            return is.file.extensions(x, "png");
        },

        gif: function $gif(x: File): Promise<boolean> {
            return is.file.extensions(x, "gif");
        },

        ogg: function $ogg(x: File): Promise<boolean> {
            return is.file.extensions(x, "ogg");
        },

        mp4: function $mp4(x: File): Promise<boolean> {
            return is.file.extensions(x, "mp4");
        },

        mkv: function $mkv(x: File): Promise<boolean> {
            return is.file.extensions(x, "mkv");
        },

        wmv: function $wmv(x: File): Promise<boolean> {
            return is.file.extensions(x, "wmv");
        },

        mov: function $mov(x: File): Promise<boolean> {
            return is.file.extensions(x, "mov");
        },

        heic: function $heic(x: File): Promise<boolean> {
            return is.file.extensions(x, "heic");
        },

        bmp: function $bmp(x: File): Promise<boolean> {
            return is.file.extensions(x, "bmp");
        },

        jpeg: function $jpeg(x: File): Promise<boolean> {
            return is.file.extensions(x, "jpeg");
        },

        tiff: function $tiff(x: File): Promise<boolean> {
            return is.file.extensions(x, "tiff");
        },

        webp: function $webp(x: File): Promise<boolean> {
            return is.file.extensions(x, "webp");
        },

        m3u: function $m3u(x: File): Promise<boolean> {
            return is.file.extensions(x, "m3u");
        },

        wav: function $wav(x: File): Promise<boolean> {
            return is.file.extensions(x, "wav");
        },

        avi: function $avi(x: File): Promise<boolean> {
            return is.file.extensions(x, "avi");
        },

        mp3: function $mp3(x: File): Promise<boolean> {
            return is.file.extensions(x, "mp3");
        }
    }
);