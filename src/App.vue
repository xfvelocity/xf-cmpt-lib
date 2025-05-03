<template>
  <xf-calendar v-model:date="range" range />

  {{ range }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { XfCalendar } from ".";

const date = ref<string>("");
const range = ref<{ from: string; to: string }>({
  from: "05-05-2025",
  to: "10-05-2025",
});
</script>

<style lang="scss" scoped></style>
