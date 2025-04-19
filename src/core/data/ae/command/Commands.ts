export function createSetUpdateIntervalCommand(interval: number) {
    return {
        type: "update_interval",
        value: interval
    }
}

export function createSelectCpuCommand(cpuId: number) {
    return {
        type: "select_cpu",
        cpuId
    }
}

export function createCancelCpuJobCommand(cpuId: number) {
    return {
        type: "cancel_job",
        cpuId
    }
}