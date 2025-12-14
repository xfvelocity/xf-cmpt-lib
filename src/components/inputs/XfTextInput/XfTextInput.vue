<template>
  <div>
    <div
      class="xf-input xf-flex"
      :class="[
        `xf-border-colour-${colour}`,
        outlined ? 'xf-input-outlined' : 'xf-input-border',
        {
          'xf-input-populated': !!modelValue || modelValue === 0 || placeholder,
          'xf-input-active': isActive,
          'xf-disabled': disabled,
        },
      ]"
    >
      <input
        :value="modelValue"
        class="xf-px-2 xf-py-1"
        :class="[` xf-text-colour-${colour} xf-text-${fontSize}`]"
        :name="name"
        :type="type"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :inputmode="inputmode"
        data-test-id="xf-text-input-input"
        v-bind="[
          inputId ? { id: inputId } : {},
          pattern ? { pattern: pattern } : {},
        ]"
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

      <xf-icon
        v-if="appendIcon"
        class="xf-mt-2 xf-mr-1"
        :class="disabled ? 'xf-cursor-default' : 'xf-cursor-pointer'"
        :src="appendIcon"
        :fill="colour"
        @click="disabled ? '' : $emit('click:append')"
      />
    </div>

    <span
      v-if="errorMessages?.length"
      class="xf-text-14 xf-fw-600 xf-text-colour-red"
      data-test-id="xf-text-input-error"
    >
      {{ errorMessages[0] }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

// ** Props **
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, null],
    default: "",
    required: true,
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
  colour: {
    type: String,
    default: "black",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  outlineBackground: {
    type: String,
    default: "white",
  },
  autocomplete: {
    type: String,
    default: "on",
  },
  fontSize: {
    type: Number,
    default: 14,
  },
  appendIcon: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  pattern: {
    type: String,
    default: "",
  },
  inputmode: {
    type: String as PropType<
      | "text"
      | "search"
      | "email"
      | "tel"
      | "url"
      | "none"
      | "numeric"
      | "decimal"
    >,
    default: "text",
  },
  maxlength: {
    type: String,
    default: "",
  },
  minlength: {
    type: String,
    default: "",
  },
  inputId: {
    type: String,
    default: "",
  },
});

// ** Emits **
const emit = defineEmits([
  "update:modelValue",
  "click:append",
  "focus",
  "blur",
  "keydown.enter",
]);

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
.xf-input {
  ::placeholder {
    color: v-bind(colour);
  }

  &-outlined {
    height: 45px;
  }
}
</style>
