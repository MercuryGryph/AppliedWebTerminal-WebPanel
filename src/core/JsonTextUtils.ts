import type JsonText from "~/core/data/minecraft/JsonText";
import type JsonTextString from "~/core/data/minecraft/JsonTextString";

export async function fetchTranslatedText(
  key: string,
  language: string,
): Promise<string | undefined> {
  const response =
    await fetch(`/translate/${language}/${key}`)
  if (response.ok) {
    return await response.text();
  }
}

export function JsonTextFrom(str: JsonTextString): JsonText {
  return JSON.parse(str) as JsonText;
}
