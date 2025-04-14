import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

/**
 * 缺少原料
 */
interface MissingIngredientError {
  what: AeKeyObject;
  amount: number;
}

export default MissingIngredientError;
