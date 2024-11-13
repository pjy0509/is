import {is} from "../is/core/is";

export class Signature {
    readonly from: number;
    readonly to: number;
    readonly signatures: string[][];

    constructor(from: number, signatures: string[][]) {
        this.from = from;
        this.to = from + signatures.reduce((prev: number, curr: string[]) => Math.max(prev, curr.length), 0);
        this.signatures = signatures;
    }

    async check(x: File): Promise<boolean> {
        const hex: string[] = await Signature.getByte(x, this.from, this.to);

        return this.signatures.some((signature: string[]) => signature.every((byte: string, index: number) => byte === hex[index] || byte === "??"));
    }

    static merge(signatures: Signature[]): Signature {
        let min: number = Math.min(...signatures.map((signature: Signature) => signature.from));

        return new Signature(min, signatures.flatMap((signature: Signature) => signature.signatures.map((hex: string[]) => Array(signature.from - min).fill("??").concat(hex))));
    }

    static getByte(x: File, from: number, to: number): Promise<string[]> {
        return new Promise(resolve => {
            const reader: FileReader = new FileReader();

            reader.onloadend = (): void => {
                const result: ArrayBuffer | string | null = reader.result;

                if (!is.array.buffer(result)) {
                    return resolve([]);
                }

                resolve(Array.prototype.slice.call(new Uint8Array(result)).map(Signature.to16));
            };

            reader.onerror = (): void => {
                resolve([]);
            };

            reader.readAsArrayBuffer(x.slice(from, to));
        });
    }

    static to16(x: number): string {
        return x.toString(16).padStart(2, "0");
    }
}