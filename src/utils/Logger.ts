const env = import.meta.env

enum LogLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warm',
    error = 'error',
}

interface ILogger {
    readonly log: (
        message: any,
        level: LogLevel,
        tag?: string,
    ) => void

    readonly debug: (message: any, tag?: string) => void
    readonly info: (message: any, tag?: string) => void
    readonly warn: (message: any, tag?: string) => void
    readonly error: (message: any, tag?: string) => void
}

const Logger: ILogger = {
    log: (
        msg: any,
        level: LogLevel,
        tag?: string,
    ): void => {
        if (!env.DEV) {
            if (level in [LogLevel.debug, LogLevel.info]) return
        }

        const formatedTag: string =
            (tag === undefined) ? "" : `[${tag}]`

        const formatedLog: string = `[${new Date().toLocaleString()}] [${level}] ${formatedTag}: ${msg}`

        switch (level) {
            case LogLevel.debug:
                console.warn(formatedLog)
                if (typeof msg !== "string") console.warn(msg)
                break
            case LogLevel.info:
                console.warn(formatedLog)
                if (typeof msg !== "string") console.warn(msg)
                break
            case LogLevel.warn:
                console.warn(formatedLog)
                if (typeof msg !== "string") console.warn(msg)
                break
            case LogLevel.error:
                console.error(formatedLog)
                if (typeof msg !== "string") console.error(msg)
                break

        }
    },

    debug(
        msg: any,
        tag?: string
    ): void {
        this.log(msg, LogLevel.debug, tag)
    },

    info(
        msg: any,
        tag?: string
    ): void {
        this.log(msg, LogLevel.info, tag)
    },

    error(
        msg: any,
        tag?: string
    ): void {
        this.log(msg, LogLevel.error, tag)
    },

    warn(
        msg: any,
        tag?: string
    ): void {
        this.log(msg, LogLevel.warn, tag)
    },
}

export default Logger
