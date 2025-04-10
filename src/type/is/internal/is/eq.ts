import {RefStack} from "../../../utils/class/RefStack";
import {getTag} from "../../../utils/function/getTag";
import {tags} from "../../../utils/constant/tags";
import {$findIndex} from "../../../utils/function/findIndex";
import {getEnumerableProperties} from "../../../utils/function/getEnumerableProperties";
import {getPrototypeProperties} from "../../../utils/function/getPrototypeProperties";

export function $eq(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean, ref: RefStack = new RefStack()): boolean {
    if (!!comparator) {
        return comparator(lhs, rhs);
    }

    const typeL = typeof lhs;
    const typeR = typeof rhs;

    if (typeL === typeR) {
        switch (typeL) {
            case "number":
                return lhs === rhs || Object.is(lhs, rhs);
            case "object":
                break;
            default:
                return lhs === rhs;
        }
    }

    if (Object.is(lhs, rhs)) {
        return true;
    }

    const tagL = getTag(lhs);
    const tagR = getTag(rhs);

    if (tagL !== tagR) {
        return false;
    }

    if (ref.has(lhs, rhs)) {
        return true;
    }

    ref.add(lhs, rhs);

    try {
        switch (tagL) {
            case tags.string:
                return $eq(lhs.toString(), rhs.toString(), comparator);
            case tags.number:
            case tags.date:
                return $eq(lhs.valueOf(), rhs.valueOf(), comparator);
            case tags.boolean:
            case tags.symbol:
                return Object.is(lhs.valueOf(), rhs.valueOf());
            case tags.function:
            case tags.asyncFunction:
            case tags.generatorFunction:
            case tags.asyncGeneratorFunction:
                return lhs === rhs;
            case tags.regExp:
                return lhs.source === rhs.source && lhs.flags === rhs.flags;
            case tags.error:
            case tags.domException:
                return lhs.name === rhs.name && lhs.message === rhs.message;
            case tags.map:
                if (lhs.size !== rhs.size) {
                    return false;
                }

                for (const [keyL, valueL] of lhs.entries()) {
                    if (!rhs.has(keyL) || !$eq(valueL, rhs.get(keyL), comparator, ref)) {
                        return false;
                    }
                }

                return true;
            case tags.set:
                if (lhs.size !== rhs.size) {
                    return false;
                }

                const arrayL = Array.from(lhs);
                const arrayR = Array.from(rhs);

                for (const valueL of arrayL) {
                    const index = $findIndex(arrayR, valueR => $eq(valueL, valueR, comparator, ref));

                    if (index === -1) {
                        return false;
                    }

                    arrayR.splice(index, 1);
                }

                return true;
            case tags.array:
            case tags.uint8Array:
            case tags.uint16Array:
            case tags.uint32Array:
            case tags.uint8ClampedArray:
            case tags.int8Array:
            case tags.int16Array:
            case tags.int32Array:
            case tags.bigUint64Array:
            case tags.bigInt64Array:
            case tags.float32Array:
            case tags.float64Array:
                let lhsIsBuffer = false;
                let rhsIsBuffer = false;

                try {
                    lhsIsBuffer = lhs instanceof Buffer;
                } catch {
                }

                try {
                    rhsIsBuffer = rhs instanceof Buffer;
                } catch {
                }

                if (lhsIsBuffer !== rhsIsBuffer || lhs.length !== rhs.length) {
                    return false;
                }

                for (let i = 0; i < lhs.length; i++) {
                    if (!$eq(lhs[i], rhs[i], comparator, ref)) {
                        return false;
                    }
                }

                return true;
            case tags.arrayBuffer:
                if (lhs.byteLength !== rhs.byteLength) {
                    return false;
                }

                return $eq(new Uint8Array(lhs), new Uint8Array(rhs), comparator, ref);
            case tags.dataView:
                if (lhs.byteLength !== rhs.byteLength || lhs.byteOffset !== rhs.byteOffset) {
                    return false;
                }

                return $eq(lhs.buffer, rhs.buffer, comparator, ref);
            case tags.object:
                const lhsProto = Object.getPrototypeOf(lhs);
                const rhsProto = Object.getPrototypeOf(lhs);

                const lhsIsPlain = (lhsProto === null || Object.getPrototypeOf(lhsProto) === null || lhsProto === Object.prototype) && Object.prototype.toString.call(lhs) === "[object Object]";
                const rhsIsPlain = (rhsProto === null || Object.getPrototypeOf(rhsProto) === null || rhsProto === Object.prototype) && Object.prototype.toString.call(rhs) === "[object Object]";

                if (!$eq(lhs.constructor, rhs.constructor, comparator, ref) && (!lhsIsPlain || !rhsIsPlain)) {
                    return false;
                }

                const keys1L = getEnumerableProperties(lhs);
                const keys1R = getEnumerableProperties(rhs);

                if (keys1L.length !== keys1R.length) {
                    return false;
                }

                for (const key1L of keys1L) {
                    if (!$eq(lhs[key1L], rhs[key1L], comparator, ref)) {
                        return false;
                    }
                }

                return true;
            default:
                if (lhs === rhs) {
                    return true;
                }

                const keys2L = getPrototypeProperties(lhs);
                const keys2R = getPrototypeProperties(rhs);

                if (keys2L.length !== keys2R.length) {
                    return false;
                }

                if (tagL === tags.file || tagL === tags.blob) {
                    keys2L.push("size", "type");
                }

                for (const key2L of keys2L) {
                    if (!$eq(lhs[key2L], rhs[key2L], comparator, ref)) {
                        return false;
                    }
                }

                return true;
        }
    } finally {
        ref.remove(lhs, rhs);
    }
}