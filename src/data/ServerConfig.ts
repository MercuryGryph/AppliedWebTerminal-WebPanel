import Logger from "~/utils/Logger";

interface ServerConfig {
    readonly title: string,
    readonly webSocketUrl?: string,
}

export default ServerConfig

export function defaultServerConfigValue(): ServerConfig {
    return {
        title: 'Applied Web Terminal'
    }
}


const ServerConfigUrl = '/settings'

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
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )

    response.then(response => {
        if (response.ok) {
            const data: Promise<ServerConfig> = response.json();

            data.then(data => {
                Logger.info('Fetch ServerConfig.yaml Success :')
                Logger.info(data);
                onSuccess(data);
            })

        } else {
            Logger.warn('Fetch ServerConfig.yaml Error :')
            Logger.warn(response.toString())

            onError(response)
        }
    })
}
