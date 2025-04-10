export function monthNumberToString(x: number): string {
    return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][x] ?? "";
}