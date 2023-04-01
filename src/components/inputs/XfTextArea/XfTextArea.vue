<template>
  <div>
    <div
      class="xf-flex xf-input"
      :class="[
        `xf-border-colour-${colour}`,
        outlined ? 'xf-input-outlined' : 'xf-input-border',
        {
          'xf-input-populated': !!modelValue,
          'xf-input-active': isActive,
          'xf-disabled': disabled,
        },
      ]"
    >
      <textarea
        class="xf-px-2 yd-py-1 yd-w-100 xf-z-2"
        :class="[`xf-text-colour-${colour} xf-text-${fontSize}`]"
        :value="modelValue"
        :rows="rows"
        :autocomplete="autocomplete"
        data-test-id="xf-text-area-input"
        @input="emitValue"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="disabled ? '' : $emit('keydown.enter')"
      />

      <label
        v-if="label"
        :class="[
          `xf-text-colour-${colour} xf-text-${fontSize}`,
          { [`xf-bg-${outlineBackground}`]: outlined },
        ]"
        :for="name"
      >
        {{ label }}
      </label>
    </div>

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
import { ref } from "vue";

// ** Base **
withDefaults(
  defineProps<{
    label: string;
    modelValue: string | number | null;
    rows?: number;
    name?: string;
    type?: string;
    errorMessages?: string[];
    colour?: string;
    disabled?: boolean;
    outlined?: boolean;
    outlineBackground?: string;
    autocomplete?: string;
    fontSize?: number;
  }>(),
  {
    fontSize: 14,
    rows: 3,
    type: "text",
    colour: "black",
    outlineBackground: "white",
  }
);

// ** Emits **
const emit = defineEmits(["update:modelValue", "focus", "blur"]);

// ** Data **
const isActive = ref<boolean>(false);

// ** Methods **
const onFocus = (event: FocusEvent): void => {
  emit("focus", event);
  isActive.value = true;
};

const onBlur = (event: FocusEvent): void => {
  emit("blur", event);
  isActive.value = false;
};

const emitValue = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  overflow: auto;
  outline: none;
  width: 100%;
  border-radius: 0;
  background-color: transparent;
  padding-top: 5px;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
}

label {
  top: 7px;
}
</style>
