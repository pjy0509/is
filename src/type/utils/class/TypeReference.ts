import {getTag} from "../function/getTag";
import {$constructor} from "../../is/internal/is/constructor";
import {$prototype} from "../../is/internal/is/prototype";

export class TypeReference {
    readonly name: string;
    readonly of?: string;
    readonly type: string;
    readonly instance?: { new(...args: any[]): any };

    constructor(x: any) {
        const type = typeof x;
        const tag = Object.prototype.toString.call(getTag(x)).slice(8, -1);

        this.type = type;

        if (type !== "string" && type !== "number" && type !== "boolean" && type !== "symbol" && type !== "bigint" && type !== "undefined") {
            this.instance = Object.getPrototypeOf(x).constructor;
        }

        if ($constructor(x)) {
            this.name = "Constructor";

            if (x.name) {
                this.of = x.name;
            }

            return;
        }

        if (tag === "Function" || tag === "AsyncFunction" || tag === "GeneratorFunction" || tag === "AsyncGeneratorFunction") {
            this.name = tag;
            this.of = x.name;

            return;
        }

        if ($prototype(x)) {
            this.name = "Prototype";
            this.of = x.constructor.name;

            return;
        }

        if (tag === "Object") {
            this.name = "Object";

            if ("constructor" in x && "name" in x.constructor && x.constructor.name !== "Object") {
                this.of = x.constructor.name;
            }

            return;
        }

        this.name = tag;
    }

    isPrimitive(): boolean {
        return this.type === "string" || this.type === "number" || this.type === "boolean" || this.type === "symbol" || this.type === "bigint" || this.type === "undefined";
    }

    toString() {
        let name = this.name;

        if (this.isPrimitive()) {
            name = name.toLowerCase();
        }

        if (this.of !== undefined) {
            return name + "<" + this.of + ">";
        }

        return name;
    }
}