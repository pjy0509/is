import {obsTimeZone} from "../constant/obsTimeZone";

export function calculateTimezoneDiff(x: string): number {
    if (x === "z" || x === "Z") {
        return 0;
    }

    const obsTimeZoneDiff = obsTimeZone[x];

    if (obsTimeZoneDiff !== undefined) {
        return obsTimeZoneDiff;
    }

    const timezoneMatch = x.match(/([+-]?)(\d{2}):?(\d{2})/);

    if (timezoneMatch) {
        return (timezoneMatch[1] === "-" ? -1 : 1) * (+timezoneMatch[2] * 60 + +timezoneMatch[3]);
    }

    return 0;
}