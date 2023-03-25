<template>
  <transition>
    <div
      v-if="modelValue"
      class="xf-snackbar xf-py-2 xf-px-4 xf-center-horizontal"
      :class="`xf-bg-${backgroundColour}`"
    >
      <div :class="`xf-text-colour-${textColour}`">
        <slot />
      </div>

      <xf-icon
        v-if="closeIcon"
        class="xf-cursor-pointer"
        src="icons/close.svg"
        :fill="textColour"
        @click="$emit('update:modelValue', false)"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { watch } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Props **
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    backgroundColour?: string;
    timeout?: number;
    closeIcon?: boolean;
    textColour?: string;
  }>(),
  {
    textColour: "white",
    backgroundColour: "green-darken-3",
  }
);

// ** Emits **
const emit = defineEmits(["update:modelValue"]);

// ** Watchers **
watch(
  () => props.modelValue,
  () => {
    if (props.timeout && props.modelValue) {
      setTimeout(() => emit("update:modelValue", false), props.timeout);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.xf-snackbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;

  min-width: 200px;
  min-height: 40px;
  border-radius: 10px;
}
</style>
