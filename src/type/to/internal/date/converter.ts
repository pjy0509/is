import {DateComponentArray, DateExtended, DateExtension} from "../../../utils/types";
import {$valid} from "../../../is/internal/date/valid";
import {$predicate} from "../../../is/internal/is/is";
import {$plain} from "../../../is/internal/object/plain";
import {$invalid} from "./invalid";
import {$localFromComponents} from "./localFromComponents";
import {$fromObject} from "./fromObject";
import {$fromInput} from "./fromInput";
import {$fromNumber} from "./fromNumber";
import {$fromAspDotNetJson} from "./fromAspDotNetJson";
import {$fromIso} from "./fromIso";
import {$fromRfc} from "./fromRfc";

export function $converter(): DateExtended;
export function $converter(x: unknown): DateExtended;
export function $converter<T extends any[]>(...x: T): DateExtended;
export function $converter(): DateExtended {
    const length = arguments.length;

    if (length === 0) {
        return Object.assign(new Date(), {source: undefined, valid: true});
    }

    if (length === 1) {
        const argument = arguments[0];

        const info = {source: argument, valid: false};

        if (argument instanceof Date) {
            if (!$valid(argument)) {
                return Object.assign($invalid, info);
            }

            info.valid = true;

            return Object.assign(argument, info);
        }

        if (argument instanceof HTMLInputElement) {
            const fromInput = $fromInput(argument);

            if (fromInput.valid) {
                return fromInput;
            }
        }

        if ($predicate(argument, "number") || $predicate(argument, Number)) {
            const fromNumber = $fromNumber(argument as number);

            if (fromNumber.valid) {
                return fromNumber;
            }
        }

        if (Array.isArray(argument)) {
            if (argument.length > 7) {
                return Object.assign($invalid, info);
            }

            const localFromComponents = $localFromComponents([...argument] as DateComponentArray);

            if (localFromComponents.valid) {
                return localFromComponents;
            }
        }

        const fromAspDotNetJsonDate = $fromAspDotNetJson(argument as string);

        if (fromAspDotNetJsonDate.valid) {
            return fromAspDotNetJsonDate;
        }

        const fromIsoDate = $fromIso(argument as string);

        if (fromIsoDate.valid) {
            return fromIsoDate;
        }

        const fromRfcDate = $fromRfc(argument as string);

        if (fromRfcDate.valid) {
            return fromRfcDate;
        }

        if ($plain(argument)) {
            const fromComponents = $fromObject(argument);

            if (fromComponents.valid) {
                return fromComponents;
            }
        }

        if (typeof argument !== "string" && !(argument instanceof String)) {

            const date = new Date(argument as any);

            if (!$valid(date)) {
                return Object.assign(date, info);
            }

            info.valid = true;

            return Object.assign(date, info);
        }
    }

    const info: DateExtension = {source: arguments, valid: false};

    if (arguments.length > 7) {
        return Object.assign($invalid, info);
    }

    const localFromComponents = $localFromComponents([...arguments] as DateComponentArray);

    if (localFromComponents.valid) {
        return localFromComponents;
    }

    return Object.assign($invalid, info);
}