<script setup lang="ts">

import type JsonText from "~/core/data/minecraft/JsonText";

import { vsprintf } from "sprintf-js"
import { computed } from "vue";

const props = defineProps<{
  jsonText: JsonText
}>()

const styleClasses = computed<string>(()=>{
  let result: string = ""
  const jsonText = props.jsonText

  if (jsonText.bold) {
    result += " font-bold"
  }
  if (jsonText.italic) {
    result += " font-italic"
  }
  if (jsonText.underline) {
    result += " underline"
  }
  if (jsonText.strikethrough) {
    result += " line-through"
  }
  return result
})

const chars = computed<string[]>(()=>{
  const result: string[] = []
  const rawText = props.jsonText.text
  let formattedText: string;
  if (props.jsonText.with) {
    formattedText = vsprintf(rawText, props.jsonText.with);
  } else {
    formattedText = rawText
  }
  for (let i = 0; i < formattedText.length; i++) {
    result.push(formattedText.charAt(i))
  }
  return result
})

</script>

<template class="inline">
  <div v-for="char in chars">
    <span :class="styleClasses">
      {{ char }}
    </span>
  </div>
</template>
