export function clamp(
    x: number,
    min: number,
    max: number
): number {
    return Math.min(Math.max(x, min), max)
}
