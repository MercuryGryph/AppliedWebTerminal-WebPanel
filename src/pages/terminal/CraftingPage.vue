<script setup lang="ts">

import type {MECraftingServiceStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";
import type {Consumer, Subscriber} from "~/core/Subscriber";
import {useAppStorage} from "~/data/AppStorage";

const props = defineProps<{
    sender: Consumer<any>,
    messageSubscriber: Subscriber<MECraftingServiceStatusBundle>
}>()

</script>

<template>
    //make lint happy
</template>

<style scoped>

</style>