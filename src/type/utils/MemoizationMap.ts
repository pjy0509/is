import {getTag} from "./functions";
import is from "../is/index";
import to from "../to/index";

export class MemoizationMap {
    private static hashCache: Map<any, string> = new Map();
    private static memoizationCache: Map<(...args: any[]) => any, Map<string, any>> = new Map();
    static instance: MemoizationMap = new MemoizationMap();

    set(fn: (...args: any[]) => any, args: IArguments, at: number, returnValue: any, age?: number): void {
        if (new Date().getTime() - at < 10) {
            return;
        }

        const key: string = MemoizationMap.hashValue(args);

        let fnCache: Map<string, any> | undefined = MemoizationMap.memoizationCache.get(fn);

        if (!fnCache) {
            fnCache = new Map<string, any>();
            MemoizationMap.memoizationCache.set(fn, fnCache);
        }

        const cacheEntry: any = returnValue;

        if (age !== undefined) {
            setTimeout(() => MemoizationMap.memoizationCache.get(fn)?.delete(key), age);
        }

        fnCache.set(key, cacheEntry);
    }

    get(fn: (...args: any[]) => any, args: IArguments): any {
        const fnCache: Map<string, any> | undefined = MemoizationMap.memoizationCache.get(fn);

        if (!fnCache) {
            return undefined;
        }

        const key: string = MemoizationMap.hashValue(args);
        const cacheEntry: any | undefined = fnCache.get(key);

        if (!cacheEntry) {
            return undefined;
        }

        return cacheEntry;
    }

    delete(fn: (...args: any[]) => any): boolean {
        return MemoizationMap.memoizationCache.delete(fn);
    }

    private static hashValue(value: any, tag: string = getTag(value)): string {
        if (is.null(value)) {
            return tag + 'null';
        }

        if (is.undefined(value)) {
            return tag + 'undefined';
        }

        if (is.number(value) || is.boolean(value)) {
            return tag + value.toString();
        }

        if (is.string(value)) {
            return tag + '"' + value + '"';
        }

        if (is.constructor(value)) {
            return value.prototype.toString() + value.toString();
        }

        if (is.array(value)) {
            return MemoizationMap.hashArray(value, tag);
        }

        if (is.array.like(value) || is.argument(value) || is.iterator(value)) {
            return MemoizationMap.hashValue(Array.prototype.slice.call(value as any), tag);
        }

        if (is.set(value)) {
            return MemoizationMap.hashSet(value, tag);
        }

        if (is.map(value)) {
            return MemoizationMap.hashMap(value, tag);
        }

        if (is.node(value)) {
            return MemoizationMap.hashElement(value);
        }

        if (is.function(value)) {
            return tag + value.toString();
        }

        if (is.object(value)) {
            return MemoizationMap.hashObject(value, tag);
        }

        return tag + value.toString();
    }

    private static hashArray(value: any[], tag: string = getTag(value)): string {
        let arrayHash: string = tag + '{';

        for (let i: number = 0; i < value.length; i++) {
            arrayHash += MemoizationMap.hashValue(to.object.get(value, i)) + ',';
        }

        return arrayHash + '}';
    }

    private static hashSet(value: Set<any>, tag: string = getTag(value)): string {
        if (MemoizationMap.hashCache.has(value)) {
            return MemoizationMap.hashCache.get(value)!;
        }

        let setArray: string[] = Array.prototype.slice.call(value).map((e: any) => MemoizationMap.hashValue(e, tag)).sort();
        let setHash: string = 'Set{' + setArray.join(',') + '}';

        MemoizationMap.hashCache.set(value, setHash);

        return setHash;
    }

    private static hashMap(value: Map<any, any>, tag: string = getTag(value)): string {
        if (MemoizationMap.hashCache.has(value)) {
            return MemoizationMap.hashCache.get(value)!;
        }

        let mapArray: string[][] = Array.prototype.slice.call(value.entries()).map(([key, val]): string[] => [MemoizationMap.hashValue(key, tag), MemoizationMap.hashValue(val, tag)]);

        mapArray.sort(([aKey], [bKey]): number => aKey.localeCompare(bKey));

        let mapHash: string = 'Map{' + mapArray.map(([key, val]): string => key + '=>' + val).join(',') + '}';

        MemoizationMap.hashCache.set(value, mapHash);

        return mapHash;
    }

    private static hashObject(value: object, tag: string = getTag(value)): string {
        if (MemoizationMap.hashCache.has(value)) {
            return MemoizationMap.hashCache.get(value)!;
        }

        let keys: string[] = to.object.keys(value).sort();
        let objectHash: string = tag + value.toString() + value.constructor.toString() + '{';

        for (let i: number = 0; i < keys.length; i++) {
            let key: string = keys[i];

            objectHash += '"' + key + '":' + MemoizationMap.hashValue(to.object.get(value, key)) + ',';
        }

        objectHash += '}';
        MemoizationMap.hashCache.set(value, objectHash);

        return objectHash;
    }

    private static hashElement(value: Node, tag: string = getTag(value)): any {
        const stack: string[] = [];

        while (value.parentNode != null) {
            let sibCount: number = 0;
            let sibIndex: number = 0;

            for (let i: number = 0; i < value.parentNode.childNodes.length; i++) {
                const sib: ChildNode = value.parentNode.childNodes[i];

                if (sib.nodeName === value.nodeName) {
                    if (sib === value) {
                        sibIndex = sibCount;
                    }

                    sibCount++;
                }
            }

            if (is.node.element(value) && value.hasAttribute('id') && value.id !== '') {
                stack.unshift(value.nodeName.toLowerCase() + '#' + value.id);
            } else if (sibCount > 1) {
                stack.unshift(value.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(value.nodeName.toLowerCase());
            }

            value = value.parentNode;
        }

        return tag + stack.join('>');
    }
}