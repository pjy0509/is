export class Signature {
    readonly from: number;
    readonly to: number;
    readonly signatures: string[][];

    constructor(from: number, signatures: string[][]) {
        this.from = from;
        this.to = from + signatures.reduce((prev, curr) => Math.max(prev, curr.length), 0);
        this.signatures = signatures;
    }

    async check(x: File): Promise<boolean> {
        const hex = await Signature.getByte(x, this.from, this.to);

        return this.signatures.some(signature=> signature.every((byte, index) => byte === hex[index] || byte === "??"));
    }

    static merge(signatures: Signature[]): Signature {
        let min = Math.min(...signatures.map(signature => signature.from));

        return new Signature(min, signatures.flatMap(signature => signature.signatures.map(hex => Array(signature.from - min).fill("??").concat(hex))));
    }

    static getByte(x: File, from: number, to: number): Promise<string[]> {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;

                if (!(result instanceof ArrayBuffer)) {
                    return resolve([]);
                }

                resolve(Array.prototype.slice.call(new Uint8Array(result)).map(binary => binary.toString(16).padStart(2, "0")));
            };

            reader.onerror = () => {
                resolve([]);
            };

            reader.readAsArrayBuffer(x.slice(from, to));
        });
    }
}