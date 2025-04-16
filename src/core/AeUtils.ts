import type AeKeyTypeInfo from "~/core/data/ae/core/aekey/AeKeyTypeInfo";
import type StorageData from "~/core/data/ae/StorageData";
import {types} from "sass";
import List = types.List;
import MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";

export type TerminalSort = 'BY_COUNT' | 'BY_NAME' | 'BY_ID'

export async function fetchAeStoragePaged(
    pageIndex: number,
    limitPerPage: number,
    sort: TerminalSort,
    bearerToken: string,
): Promise<StorageData | undefined> {
    const response =
        await fetch(`/storage?page=${pageIndex}&limit=${limitPerPage}&sort=${sort}`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
            }
        })

    if (response.ok) {
        return await response.json() as StorageData;
    }
}

export async function fetchCpuStatus(bearerToken: string): Promise<Array<MECpuStatusBundle> | undefined> {
    let response = await fetch("crafting/cpus", {
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
        }
    })
    if (response.ok){
        return await response.json() as Array<MECpuStatusBundle>
    }
}

export async function fetchAeKeyTypesInfo(
    bearerToken: string,
): Promise<AeKeyTypeInfo[] | undefined> {
    const response =
        await fetch('/registries/aeKeyTypes', {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
            },
        })

    if (response.ok) {
        return await response.json() as AeKeyTypeInfo[];
    }
}
