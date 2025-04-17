import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

interface MEStack {
    readonly what: AeKeyObject
    readonly amount: number
    readonly craftable: boolean
}

export default MEStack
