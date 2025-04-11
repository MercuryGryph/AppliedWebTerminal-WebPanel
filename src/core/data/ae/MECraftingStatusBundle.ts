import type MECraftingStatusEntry from "~/core/data/ae/MECraftingStatusEntry";

interface MECraftingStatusBundle {
  fullStatus: boolean
  elapsedTime: number
  remainingItemCount: number
  startItemCount: number
  entries: Array<MECraftingStatusEntry>
}

export default MECraftingStatusBundle

export function updateMECraftingStatusBundle(
  old: MECraftingStatusBundle | undefined,
  data: MECraftingStatusBundle | undefined,
) {
  if (!old || !data) {
    old = data
    return old
  }

  if (data.fullStatus) {
    old.entries = data.entries
    return old
  }
  const map: Map<number, MECraftingStatusEntry> = new Map()
  old.entries.forEach(entry => {
    map.set(entry.serial, entry)
  })
  data.entries.forEach(entry => {
    map.set(entry.serial, entry)
  })
  old.entries = map.values().toArray()
  return old
}
