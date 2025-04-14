import type AeKeyType from "~/core/data/ae/core/aekey/AeKeyType";

interface CraftingRequest {
  type: AeKeyType;
  id: string;
  count: number;
  calculationStrategy?: CalculationStrategy;
}

export default CraftingRequest;
