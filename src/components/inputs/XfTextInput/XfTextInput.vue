<template>
  <div
    class="xf-text-input xf-input"
    :class="[
      `xf-border-colour-${colour}`,
      {
        'xf-input-populated': !!modelValue,
        'xf-input-active': isActive,
      },
    ]"
  >
    <input
      :value="modelValue"
      class="xf-text-input-input xf-px-2 xf-py-1 xf-text-16"
      :class="[` xf-text-colour-${colour}`]"
      :name="name"
      :type="type"
      data-test-id="xf-text-input-input"
      @input="emitValue"
      @focus="isActive = true"
      @blur="isActive = false"
    />

    <label v-if="label" :class="`xf-text-colour-${colour}`" :for="name">
      {{ label }}
    </label>

    <xf-icon
      v-if="appendIcon"
      class="xf-mt-2 xf-mr-1 xf-cursor-pointer"
      :src="appendIcon"
      :size="14"
      :fill="colour"
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
    colour?: string;
    appendIcon?: string;
  }>(),
  {
    type: "text",
    colour: "black",
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
