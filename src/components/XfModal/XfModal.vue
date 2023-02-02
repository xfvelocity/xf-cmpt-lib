<template>
  <div
    v-if="modelValue"
    class="xf-modal xf-w-100 xf-h-100 xf-flex-center"
    @click="closeModal"
  >
    <div
      class="xf-modal-content xf-p-6 xf-m-4 xf-pb-12"
      :class="`xf-bg-${backgroundColour} xf-text-colour-${textColour}`"
      @click.stop=""
    >
      <xf-icon
        class="xf-modal-content-close yd-cursor-pointer xf-text-right"
        svg="/icons/close.svg"
        @click.stop="closeModal"
      />

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ** Base **
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  backgroundColour: {
    type: String,
    default: "white",
  },
  textColour: {
    type: String,
    default: "black",
  },
});

const emit = defineEmits(["update:modelValue"]);

// ** Methods **
const closeModal = (): void => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style lang="scss" scoped>
.xf-modal {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  &-content {
    min-height: 300px;
    min-width: 300px;
  }
}
</style>
