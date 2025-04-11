import YAML from "yaml";
import Logger from "~/utils/Logger";

interface ServerConfig {
  readonly useWss: boolean,
  readonly title: string,
}

export default ServerConfig

const ServerConfigUrl = '/data/ServerConfig.yaml'

export function fetchServerConfig(
  onSuccess: (serverConfig: ServerConfig) => void,
  onError: (response: Response) => void = () => {
  },
) {
  Logger.info("Fetching server config...");

  const response = fetch(
    ServerConfigUrl,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  response.then(response => {
    if (response.ok) {
      const raw = response.text();

      raw.then(data => {
        const res: ServerConfig = YAML.parse(data)
        Logger.info('Fetch ServerConfig.yaml Success :')
        Logger.info(res);
        onSuccess(res);
      })

    } else {
      Logger.warn('Fetch ServerConfig.yaml Error :')
      Logger.warn(response.toString())

      onError(response)
    }
  })
}
