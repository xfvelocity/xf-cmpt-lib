<template>
  <xf-menu
    class="xf-ml-auto xf-text-colour-white"
    background-colour="grey-darken-4"
  >
    <template #activator>
      <xf-button
        style="order: 1"
        background-colour="primary"
        text-colour="black"
        text="Download"
      />
    </template>
  </xf-menu>
</template>

<script lang="ts" setup>
import { XfMenu, XfButton } from ".";
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
