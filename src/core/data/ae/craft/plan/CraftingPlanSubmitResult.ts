import type CraftingPlanRequestErrorCode from "~/core/data/ae/craft/plan/error/CraftingPlanRequestErrorCode";
import type MissingIngredientError from "~/core/data/ae/craft/plan/error/MissingIngredientError";
import type UnsuitableCpuError from "~/core/data/ae/craft/plan/error/UnsuitableCpuError";

interface CraftingPlanSubmitResult {
    id: number;
    success: boolean;
    errorCode: CraftingPlanRequestErrorCode;
    errorDetail: MissingIngredientError | UnsuitableCpuError;
}

export default CraftingPlanSubmitResult;
