import type TerminalInfo from "~/core/data/TerminalInfo";
import Logger from "~/utils/Logger";
import UserCredential from "~/core/data/UserCredential";
import UserAuthResult from "~/core/data/UserAuthResult";

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
      if (data.token) return data.token
    }
    return TerminalLoginError.ServerReturnedNotSuccess
  }

  return TerminalLoginError.HttpError
}
