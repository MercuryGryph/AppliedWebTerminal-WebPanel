import type AeKeyTypeInfo from "~/core/data/ae/core/aekey/AeKeyTypeInfo";
import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import type StorageData from "~/core/data/ae/StorageData";
import CalculationStrategy from "~/core/data/ae/craft/CalculationStrategy";
import CraftingPlanSummary from "~/core/data/ae/craft/plan/CraftingPlanSummary";
import CraftingRequest from "~/core/data/ae/craft/CraftingRequest";

export type TerminalSort = 'BY_COUNT' | 'BY_NAME' | 'BY_ID'

export async function fetchAeStoragePaged(
    pageIndex: number,
    limitPerPage: number,
    sort: TerminalSort,
    decrease: boolean,
    searchText: string,
    language: string,
    bearerToken: string,
): Promise<StorageData | undefined> {
    const response =
        await fetch(`/storage?page=${pageIndex}&limit=${limitPerPage}&sort=${sort}&decrease=${decrease}&search=${searchText}&lang=${language}`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
            }
        })

    if (response.ok) {
        return await response.json() as StorageData;
    }
}

export async function fetchCpuStatus(bearerToken: string): Promise<Array<MECpuStatusBundle> | undefined> {
    const response = await fetch("crafting/cpus", {
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

export async function createCraftPlan(
    type: string,
    id: string,
    count: number,
    calculationStrategy: CalculationStrategy,
    bearerToken: string
): Promise<CraftingPlanSummary | undefined> {
    const craftRequest: CraftingRequest = {
        type, id, count, calculationStrategy
    }

    const response = await fetch('/crafting/createCraftPlan', {
        cache: 'no-cache',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(craftRequest)
    })

    if (response.ok) {
        return await response.json() as CraftingPlanSummary;
    }
}
