export function dayStringToNumber(x: string): number {
    switch (x.toLowerCase()) {
        case "mon":
            return 1;
        case "tue":
            return 2;
        case "wed":
            return 3;
        case "thu":
            return 4;
        case "fri":
            return 5;
        case "sat":
            return 6;
        case "sun":
            return 7;
    }
    return 1;
}