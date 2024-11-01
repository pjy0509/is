import {getByte} from "./functions";

export class Signature {
    readonly from: number;
    readonly to: number;
    readonly signatures: Array<Array<string>>;

    constructor(from: number, signatures: Array<Array<string>>) {
        this.from = from;
        this.to = from + signatures.reduce((prev, curr) => Math.max(prev, curr.length), 0);
        this.signatures = signatures;
    }

    async check(x: File): Promise<boolean> {
        const hex: Array<string> = await getByte(x, this.from, this.to);

        return this.signatures.some(signature => signature.every((byte, index) => byte === hex[index] || byte === "??"));
    }

    static merge(signatures: Array<Signature>): Signature {
        let min: number = Math.min(...signatures.map(signature => signature.from));

        return new Signature(min, signatures.flatMap(signature => signature.signatures.map(hex => Array(signature.from - min).fill("??").concat(hex))));
    }
}