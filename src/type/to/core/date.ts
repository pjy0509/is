import {DateComponentArray, DateComponents, DateExtended, DateLike, DateUnit} from "../../utils/types";
import {$converter} from "../internal/date/converter";
import {$unit} from "../internal/date/unit";
import {$invalid} from "../internal/date/invalid";
import {$daysOfMonth} from "../internal/date/daysOfMonth";
import {$utcFromComponents} from "../internal/date/utcFromComponents";
import {$localFromComponents} from "../internal/date/localFromComponents";
import {$fromNumber} from "../internal/date/fromNumber";
import {$fromInput} from "../internal/date/fromInput";
import {$fromObject} from "../internal/date/fromObject";
import {$fromAspDotNetJson} from "../internal/date/fromAspDotNetJson";
import {$fromIso} from "../internal/date/fromIso";
import {$fromRfc} from "../internal/date/fromRfc";
import {$components} from "../internal/date/components";
import {$week} from "../internal/date/week";
import {$isoWeek} from "../internal/date/isoWeek";
import {$shortDayName} from "../internal/date/shortDayName";
import {$dayName} from "../internal/date/dayName";
import {$shortMonthName} from "../internal/date/shortMonthName";
import {$monthName} from "../internal/date/monthName";
import {$string} from "../internal/date/string";
import {$iso} from "../internal/date/iso";
import {$rfc} from "../internal/date/rfc";
import {$get} from "../internal/date/get";
import {$add} from "../internal/date/add";
import {$sub} from "../internal/date/sub";

export interface DateConverter {
    (): DateExtended;

    (x: unknown): DateExtended;

    <T extends any[]>(...x: T): DateExtended;

    unit: {
        readonly time: DateUnit;
        readonly year: DateUnit;
        readonly month: DateUnit;
        readonly week: DateUnit;
        readonly isoWeek: DateUnit;
        readonly date: DateUnit;
        readonly hour: DateUnit;
        readonly minute: DateUnit;
        readonly second: DateUnit;
        readonly millisecond: DateUnit;
    }

    invalid: Date;

    daysOfMonth(x: DateLike): number;

    utcFromComponents(year: number, month?: number, date?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateExtended;

    utcFromComponents(components: DateComponentArray): DateExtended;

    localFromComponents(year: number, month?: number, date?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateExtended;

    localFromComponents(components: DateComponentArray): DateExtended;

    fromNumber(x: number): DateExtended;

    fromInput(x: HTMLInputElement): DateExtended;

    fromObject(x: Record<string, any>): DateExtended;

    fromAspDotNetJson(x: string): DateExtended;

    fromIso(x: string): DateExtended;

    fromRfc(x: string): DateExtended;

    components(x?: DateLike): DateComponents;

    week(x?: DateLike): number;

    isoWeek(x?: DateLike): number;

    shortDayName(x?: DateLike): string;

    dayName(x?: DateLike): string;

    shortMonthName(x?: DateLike): string

    monthName(x?: DateLike): string

    string(x?: DateLike, format?: string): string;

    iso(x?: DateLike): string;

    rfc(x?: DateLike): string;

    get(x: DateLike, unit?: DateUnit): number;

    add(x: DateLike, ...units: [n: number, unit: DateUnit][]): Date;

    sub(lhs: DateLike, rhs: DateLike, unit?: DateUnit): number;

    [Symbol.toStringTag]: string;
}

export const $date: DateConverter = Object.assign(
    $converter,
    {
        unit: $unit,
        invalid: $invalid,
        daysOfMonth: $daysOfMonth,
        utcFromComponents: $utcFromComponents,
        localFromComponents: $localFromComponents,
        fromNumber: $fromNumber,
        fromInput: $fromInput,
        fromObject: $fromObject,
        fromAspDotNetJson: $fromAspDotNetJson,
        fromIso: $fromIso,
        fromRfc: $fromRfc,
        components: $components,
        week: $week,
        isoWeek: $isoWeek,
        shortDayName: $shortDayName,
        dayName: $dayName,
        shortMonthName: $shortMonthName,
        monthName: $monthName,
        string: $string,
        iso: $iso,
        rfc: $rfc,
        get: $get,
        add: $add,
        sub: $sub,

        [Symbol.toStringTag]: "To.Date"
    }
)

