<template>
  <div>
    <label v-if="label" class="xf-fw-400" :for="name">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      class="xf-text-input xf-p-2 xf-text-16"
      :class="[`xf-bg-${background}`]"
      :placeholder="placeholder"
      :name="name"
      :type="type"
      data-test-id="xf-text-input-input"
      @input="emitValue"
    />

    <span
      v-if="errorMessages.length"
      class="xf-text-14 xf-fw-600 xf-text-colour-red"
      data-test-id="xf-text-input-error"
    >
      {{ errorMessages[0] }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

// ** Base **
defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  background: {
    type: String,
    default: "white",
  },
});

const emit = defineEmits(["update:modelValue"]);

// ** Methods **
const emitValue = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.xf-text-input {
  border: 1px solid map-get($xf-colours, "black");
  color: map-get($xf-colours, "black");

  &::placeholder {
    color: map-get($xf-colours, "black");
    font-weight: 400;
  }
}
</style>
