import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

interface MECraftingStatusEntry {
    readonly serial: number
    readonly what?: AeKeyObject
    readonly displayName: string
    readonly storedAmount: number
    readonly activeAmount: number
    readonly pendingAmount: number
}

export default MECraftingStatusEntry
