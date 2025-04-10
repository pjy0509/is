export function isOverflowDateComponents(x: { [K in string]: any }): boolean {
    return (x.dayOfYear !== undefined && (x.dayOfYear < 1 || x.dayOfYear > (((x.year % 4 === 0) && (x.year % 100 !== 0)) || (x.year % 400 === 0) ? 366: 365)))
        || (x.week !== undefined && (x.week < 1 || x.week > 53))
        || (x.day !== undefined && (x.day < 1 || x.day > 7))
        || (x.month !== undefined && (x.month < 0 || x.month > 11))
        || (x.date !== undefined && (x.date < 1 || x.date > (x.month === 1 ? ((x.year % 4 === 0) && (x.year % 100 !== 0)) || (x.year % 400 === 0) ? 29 : 28 : 31 - ((x.month % 7) % 2))))
        || (x.hour !== undefined && (x.hour < 0 || x.hour > 24 || (x.hour === 24 && ((x.minute ?? 0) !== 0 || (x.second ?? 0) !== 0 || (x.millisecond ?? 0) !== 0))))
        || (x.minute !== undefined && (x.minute < 0 || x.minute > 59))
        || (x.second !== undefined && (x.second < 0 || x.second > 59))
        || (x.millisecond !== undefined && (x.millisecond < 0 || x.millisecond > 999));
}