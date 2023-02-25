<template>
  <div>
    <xf-button> Click me </xf-button>
    <xf-text-input placeholder="Your name" />
    <xf-text-area placeholder="Your name" />
    <xf-icon src="close" :size="20" @click="isModalOpen = true" />
    <xf-modal v-model="isModalOpen"> test </xf-modal>
    <xf-banner>About me</xf-banner>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import XfButton from "./components/XfButton/XfButton.vue";
import XfTextInput from "./components/inputs/XfTextInput/XfTextInput.vue";
import XfTextArea from "./components/inputs/XfTextArea/XfTextArea.vue";
import XfIcon from "./components/XfIcon/XfIcon.vue";
import XfModal from "./components/XfModal/XfModal.vue";
import XfBanner from "./components/XfBanner/XfBanner.vue";

const isModalOpen = ref<boolean>(false);
</script>
