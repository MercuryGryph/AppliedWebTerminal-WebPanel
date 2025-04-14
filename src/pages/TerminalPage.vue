<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type JsonText from "~/core/data/minecraft/JsonText";
import CraftingPlanEntryCard from "~/components/CraftingPlanEntryCard.vue";

const jsonText: JsonText = {
    color: "#8ae",
    bold: false,
    italic: true,
    underline: true,
    strikethrough: true,
    translate: "item.ae2.semi_dark_monitor",
    text: "test json text %s",
    with: ['hello', 'world']
}

const entry: CraftingPlanSummaryEntry = {
    craftAmount: 100,
    missingAmount: 50,
    storedAmount: 13,
    what: {
        id: 'xxx',
        type: 'xxx',
        displayName: 'xxx'
    }
}
const entry2: CraftingPlanSummaryEntry = {
    craftAmount: 100,
    storedAmount: 13,
    what: {
        id: 'xxx',
        type: 'xxx',
        displayName: 'xxx'
    }
}
const entry3: CraftingPlanSummaryEntry = {
    storedAmount: 13,
    what: {
        id: 'xxx',
        type: 'xxx',
        displayName: 'xxx'
    }
}

</script>

<template>
    <div class="flex items-stretch">
        <div class="max-w-300px min-w-150px w-30% b-r-1 b-r-#555 b-r-solid">
            cpus
            <JsonTextSpan :json-text="jsonText" minecraft-font class="block" />
        </div>

        <div class="grow">
            progress
            <CraftingPlanEntryCard :entry="entry" />
            <CraftingPlanEntryCard :entry="entry2" />
            <CraftingPlanEntryCard :entry="entry3" />
        </div>
    </div>
</template>
