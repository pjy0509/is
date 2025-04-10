export function $image(x: File): Promise<boolean> {
    const image = new Image();
    const url = URL.createObjectURL(x);

    return new Promise(resolve => {
        image.onload = () => {
            resolve(true);
            URL.revokeObjectURL(url);
            image.remove();
        };

        image.onerror = () => {
            resolve(false);
            URL.revokeObjectURL(url);
            image.remove();
        };

        image.src = url;
    });
}