const units: string[] = ["", "K", "M", "G", "T"]
const pow3: number = 10**3

export function formatNumber(number: number): string {
    if (number < 10000) return number.toString()
    let unitIndex = 0
    let temp = number
    while (temp > pow3 && unitIndex < units.length) {
        temp = temp / pow3
        unitIndex++
    }
    if (unitIndex >= units.length) {
        return number.toExponential(2)
    }

    return `${temp.toFixed(1)}${units[unitIndex]}`
}
