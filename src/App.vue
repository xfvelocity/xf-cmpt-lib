<template>
  <xf-calendar v-model:date="date" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { XfCalendar } from ".";

const date = ref<string>("");
</script>

<style lang="scss" scoped></style>
