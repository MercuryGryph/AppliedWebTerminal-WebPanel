import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";

/**
 * @param simulation 网络是否缺少物品
 */
interface CraftingPlanSummary {
  id: number;
  usedBytes: number;
  /**
   * 网络是否缺少物品
   */
  simulation: boolean;
  entries: CraftingPlanSummaryEntry[];
}

export default CraftingPlanSummary
