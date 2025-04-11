import type TerminalInfo from "~/core/data/TerminalInfo";
import Logger from "~/utils/Logger";

export async function fetchTerminalList(): Promise<TerminalInfo[]> {
  Logger.info("Fetching Terminal list...");
  const response = await fetch('/list', {
    cache: 'no-cache',
  })
  if (response.ok) {
    const terms = await response.json();

    Logger.info('Fetch Terminal list successfully.');
    Logger.info(terms);

    return terms
  }
  return []
}
