export class RefStack {
    private stack: Map<any, any>;

    constructor() {
        this.stack = new Map<any, any>();
    }

    add(lhs: any, rhs: any): void {
        this.stack.set(lhs, rhs);
        this.stack.set(rhs, lhs);
    }

    has(lhs: any, rhs: any): boolean {
        return this.stack.get(lhs) != null && this.stack.get(rhs) != null;
    }

    remove(lhs: any, rhs: any): void {
        this.stack.delete(lhs);
        this.stack.delete(rhs);
    }
}