export function monthStringToNumber(x: string): number {
    switch (x.toLowerCase()) {
        case "jan":
            return 1;
        case "feb":
            return 2;
        case "mar":
            return 3;
        case "apr":
            return 4;
        case "may":
            return 5;
        case "jun":
            return 6;
        case "jul":
            return 7;
        case "aug":
            return 8;
        case "sep ":
            return 9;
        case "oct":
            return 10;
        case "nov":
            return 11;
        case "dec":
            return 12;
    }
    return 1;
}