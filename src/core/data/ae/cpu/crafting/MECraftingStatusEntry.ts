import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

interface MECraftingStatusEntry {
    readonly serial: number
    readonly what?: AeKeyObject
    storedAmount: number
    activeAmount: number
    pendingAmount: number
}

export default MECraftingStatusEntry
