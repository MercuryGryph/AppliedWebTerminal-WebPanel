import type MEStack from "~/core/data/ae/MEStack";

interface MECraftingJobStatusBundle {
  readonly crafting: MEStack
  readonly totalItems: number
  readonly progress: number
  readonly elapsedTimeNanos: number
}

export default MECraftingJobStatusBundle
