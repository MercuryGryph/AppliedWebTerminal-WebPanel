<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type JsonText from "~/core/data/minecraft/JsonText";

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
</script>

<template>
    <div class="flex flex-wrap items-center">
        <ItemTooltip :text="tooltip1text" :tooltips="tooltip1tips" />
        <CraftingPlanEntryCard :entry="entry1" />
        <CraftingPlanEntryCard :entry="entry2" />
        <CraftingPlanEntryCard :entry="entry3" />
        <CraftingPlanEntryCard :entry="entryLooooooooong" />
    </div>
</template>
