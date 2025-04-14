import type AeKeyType from "~/core/data/ae/core/aekey/AeKeyType";
import type JsonTextString from "~/core/data/minecraft/JsonTextString";

interface AeKeyObject {
  id: string;
  displayName: JsonTextString;
  type: AeKeyType;
}

export default AeKeyObject;
