<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type JsonText from "~/core/data/minecraft/JsonText";
import type MECraftingStatusEntry from "~/core/data/ae/cpu/crafting/MECraftingStatusEntry";

const tooltip1text: JsonText = {
    translate: 'block.ae2.sky_stone_block'
}
const tooltip1tips: string[] = [
    'Available: 800.0M'
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
    serial:0,
    displayName:"{\"translate\": \"block.ae2.quartz_glass\"}",
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
    serial:0,
    displayName:"{\"translate\": \"block.ae2.quartz_glass\"}",
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
    serial:0,
    displayName:"{\"translate\": \"block.ae2.quartz_glass\"}",
    what: {
        id: "ae2:quartz_glass",
        displayName: "{\"translate\": \"block.ae2.quartz_glass\"}",
        type: "ae2:i"
    }
}
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
    </div>
</template>
