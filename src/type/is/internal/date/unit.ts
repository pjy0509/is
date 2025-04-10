import {dateSymbol, DateUnit, hourSymbol, isoWeekSymbol, millisecondSymbol, minuteSymbol, monthSymbol, secondSymbol, timeSymbol, weekSymbol, yearSymbol} from "../../../utils/types";

export const $unit = {
    time: timeSymbol as DateUnit,
    year: yearSymbol as DateUnit,
    month: monthSymbol as DateUnit,
    isoWeek: isoWeekSymbol as DateUnit,
    week: weekSymbol as DateUnit,
    date: dateSymbol as DateUnit,
    hour: hourSymbol as DateUnit,
    minute: minuteSymbol as DateUnit,
    second: secondSymbol as DateUnit,
    millisecond: millisecondSymbol as DateUnit,
}