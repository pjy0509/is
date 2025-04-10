export function $global(x: symbol): boolean {
    const description = x.description;

    if (description === undefined) {
        return false;
    }

    return Symbol.for(description) === x;
}