import type TerminalInfo from "~/core/data/TerminalInfo";
import type UserAuthResult from "~/core/data/UserAuthResult";
import type UserCredential from "~/core/data/UserCredential";
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

export enum TerminalLoginError {
  ServerReturnedNotSuccess,
  HttpError
}

export async function loginTerminal(
  uuid: string,
  password: string,
): Promise<string | TerminalLoginError> {
  const credential: UserCredential = {
    uuid, password
  }

  const response = await fetch('/login', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credential),
  })

  if (response.ok) {
    const data: UserAuthResult = await response.json();
    if (data.success) {
      if (data.payload) return data.payload
    }
    return TerminalLoginError.ServerReturnedNotSuccess
  }

  return TerminalLoginError.HttpError
}
