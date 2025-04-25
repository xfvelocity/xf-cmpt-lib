<template>
  <div class="xf-flex xf-flex-align-items-center">
    <input
      :name="name"
      type="checkbox"
      :value="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <label class="xf-ml-2" :for="name">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
// ** Props **
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  label: {
    type: String,
    default: "",
    required: true,
  },
});

// ** Emits **
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  background: transparent;
  transform: scale(1.4);
}
</style>
