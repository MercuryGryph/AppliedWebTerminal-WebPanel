<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";

const entry1: CraftingPlanSummaryEntry = {
    what: {
        id: '1',
        displayName: `{"translate": "block.ae2.sky_stone_tank"}`,
        type: 'i',
    },
    craftAmount: 100_000_000
}
const entry2: CraftingPlanSummaryEntry = {
    what: {
        id: '1',
        displayName: `{"translate": "block.ae2.quartz_glass"}`,
        type: 'i',
    },
    missingAmount: 99_999_900,
    storedAmount: 100,
}
const entry3: CraftingPlanSummaryEntry = {
    what: {
        id: '1',
        displayName: `{"translate": "block.ae2.sky_stone_block"}`,
        type: 'i',
    },
    storedAmount: 800_000_000,
}
</script>

<template>
    <CraftingPlanEntryCard :entry="entry1" />
    <CraftingPlanEntryCard :entry="entry2" />
    <CraftingPlanEntryCard :entry="entry3" />
</template>
