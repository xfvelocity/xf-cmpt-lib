<template>
  <div>
    <textarea
      class="xf-text-area xf-p-2 xf-text-16"
      :class="[`xf-bg-${background}`]"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      data-test-id="xf-text-area-input"
      @input="emitValue"
    />

    <span
      v-if="errorMessages?.length"
      class="xf-text-14 xf-fw-600 xf-text-colour-red"
      data-test-id="xf-text-area-error"
    >
      {{ errorMessages[0] }}
    </span>
  </div>
</template>

<script lang="ts" setup>
// ** Base **
withDefaults(
  defineProps<{
    placeholder?: string;
    modelValue: string;
    background?: string;
    rows?: number;
    type?: string;
    errorMessages?: string[];
  }>(),
  {
    background: "white",
    rows: 5,
    type: "text",
  }
);

const emit = defineEmits(["update:modelValue"]);

// ** Methods **
const emitValue = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.xf-text-area {
  border: 1px solid map-get($xf-colours, "black");
  color: map-get($xf-colours, "black");
  resize: none;

  &::placeholder {
    color: map-get($xf-colours, "black");
    font-weight: 400;
  }
}
</style>
