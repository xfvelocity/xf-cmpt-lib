<template>
  <div
    class="xf-text-input xf-input"
    :class="{
      'xf-input-populated': !!modelValue,
      'xf-input-active': isActive,
    }"
  >
    <label
      v-if="label"
      class="xf-fw-400"
      :class="`xf-text-${textColour}`"
      :for="name"
    >
      {{ label }}
    </label>
    <input
      :value="modelValue"
      class="xf-text-input-input xf-px-2 xf-py-1 xf-text-16"
      :class="[`xf-border-colour-${textColour} xf-text-${textColour}`]"
      :name="name"
      :type="type"
      data-test-id="xf-text-input-input"
      @input="emitValue"
      @focus="isActive = true"
      @blur="isActive = false"
    />

    <xf-icon
      v-if="appendIcon"
      class="xf-mt-1 xf-cursor-pointer"
      :src="appendIcon"
      :size="20"
      @click="$emit('click:append')"
    />
  </div>

  <span
    v-if="errorMessages?.length"
    class="xf-text-14 xf-fw-600 xf-text-colour-red"
    data-test-id="xf-text-input-error"
  >
    {{ errorMessages[0] }}
  </span>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Base **
withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    name?: string;
    type?: string;
    errorMessages?: string[];
    textColour?: string;
    appendIcon?: string;
  }>(),
  {
    type: "text",
    textColour: "black",
  }
);

// ** Emits **
const emit = defineEmits(["update:modelValue", "click:append"]);

// ** Data **
const isActive = ref<boolean>(false);

// ** Methods **
const emitValue = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.xf-text-input {
  border-bottom: 1px solid;
  display: flex;
}
</style>
