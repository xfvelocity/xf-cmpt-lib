<template>
  <div style="max-width: 400px; margin: 20px">
    <xf-select v-model="test" :options="list" label="Name" />

    {{ test }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import XfSelect from "./components/inputs/XfSelect/XfSelect.vue";

const test = ref<any>("");
const list = [
  {
    text: "Test",
    value: "123",
  },
];
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
