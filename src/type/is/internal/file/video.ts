export function $video(x: File): Promise<boolean> {
    const video = document.createElement("video");
    const url = URL.createObjectURL(x);

    return new Promise(resolve => {
        video.onloadeddata = () => {
            resolve(true);
            URL.revokeObjectURL(url);
            video.remove();
        };

        video.onerror = () => {
            resolve(false);
            URL.revokeObjectURL(url);
            video.remove();
        };

        video.src = url;
    });
}