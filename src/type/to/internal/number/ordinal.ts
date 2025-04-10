export function $ordinal(x: number): string {
    x = +x;

    if (x === 1) {
        return "1st";
    }

    if (x === 2) {
        return "2nd";
    }

    if (x === 3) {
        return "3rd";
    }

    return x + "th";
}