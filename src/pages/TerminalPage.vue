<script setup lang="ts">

import type JsonText from "~/core/data/minecraft/JsonText";

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

</script>

<template>
    <div class="flex items-stretch">
        <div class="max-w-300px min-w-150px w-30% b-r-1 b-r-#555 b-r-solid">
            cpus
            <JsonTextSpan :json-text="jsonText" minecraft-font class="block" />
        </div>

        <div class="grow">
            progress
        </div>
    </div>
</template>
