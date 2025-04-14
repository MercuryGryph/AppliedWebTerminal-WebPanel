import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import type MECraftingStatusBundle from "~/core/data/ae/MECraftingStatusBundle";
import { updateMECraftingStatusBundle } from "~/core/data/ae/MECraftingStatusBundle";

interface MENetworkStatusBundle {
  cpus: Array<MECpuStatusBundle>
  craftingStatus?: MECraftingStatusBundle
}

export default MENetworkStatusBundle

export function updateMENetworkStatusBundle(
  old: MENetworkStatusBundle,
  data: MENetworkStatusBundle,
): MENetworkStatusBundle {
  old.cpus = data.cpus
  old.craftingStatus = updateMECraftingStatusBundle(
    old.craftingStatus,
    data.craftingStatus
  )
  return old
}
