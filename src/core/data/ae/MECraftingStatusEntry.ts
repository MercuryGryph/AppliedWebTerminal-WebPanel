interface MECraftingStatusEntry {
  readonly serial: number
  readonly what: string
  readonly displayName: string
  readonly storedAmount: number
  readonly activeAmount: number
  readonly pendingAmount: number
}

export default MECraftingStatusEntry
