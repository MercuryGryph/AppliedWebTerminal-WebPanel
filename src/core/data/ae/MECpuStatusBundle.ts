import type MECraftingJobStatusBundle from "~/core/data/ae/MECraftingJobStatusBundle";

interface MECpuStatusBundle {
  readonly id: number
  readonly name?: string
  readonly busy: boolean
  readonly storageSize: number
  readonly coProcessorCount: number
  readonly craftingStatus? : MECraftingJobStatusBundle
}

export default MECpuStatusBundle
