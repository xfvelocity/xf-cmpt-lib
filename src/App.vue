<template>
  <div>
    <xf-button> Click me </xf-button>
    <xf-text-input placeholder="Your name" />
    <xf-text-area placeholder="Your name" />
  </div>
</template>

<script lang="ts" setup>
import XfButton from "./components/XfButton/XfButton.vue";
import XfTextInput from "./components/inputs/XfTextInput/XfTextInput.vue";
import XfTextArea from "./components/inputs/XfTextArea/XfTextArea.vue";
</script>

<style lang="scss" scoped></style>
