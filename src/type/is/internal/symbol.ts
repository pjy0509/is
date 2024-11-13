export interface SymbolPredicate {
    (x: unknown): x is symbol;

    global(x: symbol): boolean;
}

export const $symbol: SymbolPredicate = Object.assign(
    function $symbol(x: unknown): x is symbol {
        return typeof x === "symbol";
    },
    {
        global: function $global(x: symbol): boolean {
            const description: string | undefined = x.description;

            if (description === undefined) {
                return false;
            }

            return Symbol.for(description) === x;
        }
    }
)