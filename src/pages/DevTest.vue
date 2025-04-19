<script setup lang="ts">
import type MECraftingStatusEntry from "~/core/data/ae/cpu/crafting/MECraftingStatusEntry";
import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import Component from "~/core/data/minecraft/Component";
import {decodeComponent} from "~/core/JsonTextUtils";
import ComponentView from "~/components/minecraft/ComponentView.vue";

const tooltip1text: Component = Component.translatable('block.ae2.sky_stone_block')
const tooltip1tips: Component[] = [
    Component.literal('Available: 800.0M')
]

const entry1: CraftingPlanSummaryEntry = {
    what: {
        id: 'ae2:sky_stone_tank',
        displayName: `{"translate": "block.ae2.sky_stone_tank"}`,
        type: 'ae2_i',
    },
    craftAmount: 100_000_000
}
const entry2: CraftingPlanSummaryEntry = {
    what: {
        id: 'ae2:quartz_glass',
        displayName: `{"translate": "block.ae2.quartz_glass"}`,
        type: 'ae2_i',
    },
    missingAmount: 99_999_900,
    storedAmount: 100,
}
const entry3: CraftingPlanSummaryEntry = {
    what: {
        id: 'ae2:sky_stone_block',
        displayName: `{"translate": "block.ae2.sky_stone_block"}`,
        type: 'ae2_i',
    },
    storedAmount: 800_000_000,
}
const entryLooooooooong: CraftingPlanSummaryEntry = {
    what: {
        id: 'minecraft:waxed_weathered_cut_copper_stairs',
        displayName: `{"translate": "block.minecraft.waxed_weathered_cut_copper_stairs"}`,
        type: 'ae2_i',
    },
    storedAmount: 800_000_000,
}

const statusEntry1: MECraftingStatusEntry = {
    activeAmount: 1000,
    pendingAmount: 2000,
    storedAmount: 1,
    serial: 0,
    displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
    what: {
        id: "ae2:quartz_glass",
        displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
        type: "ae2:i"
    }
}

const statusEntry2: MECraftingStatusEntry = {
    activeAmount: 0,
    pendingAmount: 50000000,
    storedAmount: 0,
    serial: 0,
    displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
    what: {
        id: "ae2:quartz_glass",
        displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
        type: "ae2:i"
    }
}

const statusEntry3: MECraftingStatusEntry = {
    activeAmount: 0,
    pendingAmount: 0,
    storedAmount: 114514,
    serial: 0,
    displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
    what: {
        id: "ae2:quartz_glass",
        displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
        type: "ae2:i"
    }
}

const cpuStatus1: MECpuStatusBundle = {
    busy: false,
    coProcessorCount: 16,
    craftingStatus: undefined,
    id: 0,
    name: undefined,
    storageSize: 3932160
}

const cpuStatus2: MECpuStatusBundle = {
    busy: false,
    coProcessorCount: 2048,
    craftingStatus: undefined,
    id: 1,
    name: JSON.stringify({
        text: "Not A Cpu"
    }),
    storageSize: 536608768
}

const cpuStatus3: MECpuStatusBundle = {
    busy: true,
    coProcessorCount: 2048,
    craftingStatus: {
        crafting: {
            amount: 1000,
            what: {
                displayName: "{\"translate\":\"block.ae2.256k_crafting_storage\"}",
                id: "ae2:256k_crafting_storage",
                type: "ae2:i"
            },
            craftable: true
        },
        totalItems: 2147483647,
        progress: 10717740,
        elapsedTimeNanos: 1919810000
    },
    id: 2,
    name: undefined,
    storageSize: 536608768
}



const testClick = (it: MECpuStatusBundle) => console.log(it)

const s = "{\"extra\":[{\"text\":\"456\"},{\"color\":\"green\",\"text\":\"7891\"}],\"text\":\"123\"}"
const testComponent1 = decodeComponent(s)
console.log(testComponent1)

const testComponent2 = Component.literal("111").append(Component.literal("222").withColor('red'))
</script>

<template>
    <div class="flex flex-wrap items-center">
        <ItemTooltip :text="tooltip1text" :tooltips="tooltip1tips"/>
        <CraftingPlanEntryCard :entry="entry1"/>
        <CraftingPlanEntryCard :entry="entry2"/>
        <CraftingPlanEntryCard :entry="entry3"/>
        <CraftingPlanEntryCard :entry="entryLooooooooong"/>
        <CraftingStatusEntryCard :entry="statusEntry1"/>
        <CraftingStatusEntryCard :entry="statusEntry2"/>
        <CraftingStatusEntryCard :entry="statusEntry3"/>
        <CpuSelectionCard :status="cpuStatus1" :clicked="testClick"/>
        <CpuSelectionCard :status="cpuStatus2"/>
        <CpuSelectionCard :status="cpuStatus3"/>
        <ComponentView :component="testComponent1"/>
        <ComponentView :component="testComponent2"/>
    </div>
</template>
