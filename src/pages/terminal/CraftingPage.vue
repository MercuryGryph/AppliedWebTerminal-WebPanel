<script setup lang="ts">

import {useAppStorage} from "~/data/AppStorage";
import {Consumer, Subscriber} from "~/core/Subscriber";
import {MECraftingServiceStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";

const props = defineProps<{
    sender: Consumer<any>,
    messageSubscriber: Subscriber<MECraftingServiceStatusBundle>
}>()

const appStorage = useAppStorage()

</script>

<template>

</template>

<style scoped>

</style>