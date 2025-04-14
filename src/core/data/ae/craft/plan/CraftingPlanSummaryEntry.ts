import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

interface CraftingPlanSummaryEntry {
  what: AeKeyObject;
  missingAmount: number;
  storedAmount: number;
  craftAmount: number;
}

export default CraftingPlanSummaryEntry
