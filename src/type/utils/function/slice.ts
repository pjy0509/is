export function $slice<T>(array: T[], start: number = 0, end: number = array.length): T[] {
    let index = -1,
        length = array.length;

    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }

    end = end > length ? length : end;

    if (end < 0) {
        end += length;
    }

    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    let result = Array(length);

    while (++index < length) {
        result[index] = array[index + start];
    }

    return result;
}