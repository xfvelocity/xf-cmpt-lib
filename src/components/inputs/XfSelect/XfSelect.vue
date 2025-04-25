<template>
  <div>
    <div
      class="xf-select"
      :tabindex="autocomplete ? '' : '0'"
      ref="selectElement"
      @keydown.tab="toggleSelect(false)"
      @focus="toggleSelect(true)"
    >
      <div
        class="xf-select-toggle xf-input"
        :class="[
          `xf-border-colour-${colour} xf-text-colour-${colour}`,
          {
            'xf-input-populated': !!modelValue || autocompleteSearch,
            'xf-input-active': isSelectActive,
          },
        ]"
        @click="toggleSelect(true)"
      >
        <label :class="`xf-text-colour-${colour}`">
          {{ label }}
        </label>
        <input
          v-if="autocomplete"
          class="xf-select-input xf-text-16"
          :class="`xf-text-colour-${colour}`"
          v-model="autocompleteSearch"
          ref="autocompleteInput"
          :tabindex="autocomplete ? '0' : ''"
          @input="autocompleteChange"
          @focus="toggleSelect(true)"
        />
        <span v-else class="xf-pl-2">
          {{ selected }}
        </span>

        <div class="xf-flex-grow" />
        <xf-loading-spinner v-if="loading" class="xf-pr-2" :size="16" />
        <xf-icon
          class="xf-mb-1 xf-mr-1 xf-select-arrow"
          :class="{ 'xf-select-arrow-active': isSelectActive }"
          :size="14"
          :fill="colour"
          src="chevron-down"
          internal
          @click.stop="toggleSelect(!isSelectActive)"
        />
      </div>

      <div
        v-if="isSelectActive && (showOptions.length || noResults)"
        class="xf-select-items"
        :class="{ 'xf-select-items-top': position === 'top' }"
      >
        <template v-if="showOptions.length">
          <div
            v-for="(option, i) in showOptions"
            :key="i"
            class="xf-flex xf-flex-align-items-center xf-select-items-item"
            @click="optionSelected(option)"
          >
            {{ option.text }}
          </div>
        </template>

        <p v-else-if="noResults" class="xf-text-center">No results</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType } from "vue";
import { SelectOption } from "@/types/app.types";
import { debounce } from "@/composables/generic";
import { onClickOutside } from "@vueuse/core";

import XfIcon from "@/components/XfIcon/XfIcon.vue";
import XfLoadingSpinner from "@/components/loading/XfLoadingSpinner/XfLoadingSpinner.vue";

// ** Props **
const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null] as PropType<
      string | number | SelectOption | null
    >,
    default: "",
    required: true,
  },
  label: {
    type: String,
    default: "",
    required: true,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
    required: true,
  },
  valueOnly: {
    type: Boolean,
    default: true,
  },
  autocomplete: {
    type: Boolean,
    default: false,
  },
  freeText: {
    type: Boolean,
    default: false,
  },
  outsideRequest: {
    type: Function,
    default: undefined,
  },
  position: {
    type: String,
    default: "bottom",
  },
  colour: {
    type: String,
    default: "black",
  },
});

// ** Emits **
const emits = defineEmits(["update:modelValue", "searchTerm", "select:toggle"]);

// ** Data **
const selected = ref<SelectOption | string | number>("");
const isSelectActive = ref<boolean>(false);
const autocompleteSearch = ref<string>("");
const showOptions = ref<SelectOption[]>(props.options);
const loading = ref<boolean>(false);
const selectElement = ref<HTMLDivElement>();
const noResults = ref<boolean>(false);
const autocompleteInput = ref<HTMLInputElement>();

// ** Methods **
const setOptions = async (): Promise<void> => {
  loading.value = true;
  noResults.value = false;

  showOptions.value = [];

  if (autocompleteSearch.value && autocompleteSearch.value.length > 1) {
    // Run the function which has been defined outside this component and passed in.
    // OutsideRequest must return the results so they can be used here.
    if (props.outsideRequest) {
      showOptions.value = await props.outsideRequest(autocompleteSearch.value);
    } else {
      showOptions.value = props.options
        .filter((option) =>
          option.text
            .toLowerCase()
            .includes(autocompleteSearch.value.toLowerCase()),
        )
        .slice(0, 8);
    }
  }

  if (!showOptions.value.length && autocompleteSearch.value.length > 1) {
    noResults.value = true;
  }

  emits("searchTerm", autocompleteSearch.value);
  loading.value = false;
};

const autocompleteChange = debounce(setOptions, 400);

const optionSelected = (option: SelectOption): void => {
  if (option.text !== selected.value && isSelectActive.value) {
    emits("update:modelValue", props.valueOnly ? option.value : option);
    toggleSelect(false);
  }
};

const toggleSelect = (val: boolean): void => {
  if (val !== isSelectActive.value) {
    const selectedMatchesSearch: boolean =
      (selected.value as SelectOption)?.value === autocompleteSearch.value ||
      selected.value === autocompleteSearch.value;

    isSelectActive.value = val;

    emits("select:toggle", val);

    if (props.autocomplete && autocompleteInput.value && val) {
      autocompleteInput.value.focus();
    }

    if (props.freeText) {
      noResults.value = false;
    } else if (!val && autocompleteSearch.value && !selectedMatchesSearch) {
      autocompleteSearch.value = "";
      noResults.value = false;
    }
  }
};

onClickOutside(selectElement, () => {
  if (isSelectActive.value) {
    if (props.freeText) {
      optionSelected({
        text: autocompleteSearch.value,
        value: autocompleteSearch.value,
      });
    } else {
      toggleSelect(false);
    }
  }
});

// ** Lifecycle **
onMounted(() => {
  if (props.autocomplete) {
    showOptions.value = [];
  }
});

// ** Watchers **
watch(
  () => props.modelValue,
  async (value) => {
    let val = "";

    // When passing a value to the autocomplete, if there are no options shown then run the search the set them
    if (
      props.autocomplete &&
      props.outsideRequest &&
      !props.freeText &&
      !showOptions.value.length
    ) {
      autocompleteSearch.value = (value as number)?.toString();

      await setOptions();
    }

    // If value isn't an object - find its matching option and get the text value
    if (typeof value !== "object") {
      const matchingOption: SelectOption | undefined = showOptions.value.find(
        (option) => option.value == value,
      );

      val = matchingOption ? matchingOption.text : "";
    } else {
      val = (value as SelectOption).text || "";
    }

    // If theres no matching option and is free text, use raw value
    selected.value = val ? val : props.freeText ? value : "";
    autocompleteSearch.value = val
      ? val
      : props.freeText
        ? (value as number).toString()
        : "";
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/assets/styles/variables/sizes";
@use "@/assets/styles/variables/colours";

.xf-select {
  position: relative;

  &-toggle {
    display: flex;
    align-items: flex-end;
    padding: map.get(sizes.$xf-spacers, 1) 0;
    border-bottom: 1px solid map.get(colours.$xf-colours, "black");
    position: relative;
    color: map.get(colours.$xf-colours, "black");
  }

  &:focus {
    border: 0;
    outline: none;

    .xf-select-toggle {
      border-bottom: 2px solid map.get(colours.$xf-colours, "black");
    }
  }

  &-input {
    margin-right: map.get(sizes.$xf-spacers, 1);
    margin-left: -2px;
  }

  &-items {
    position: absolute;
    background: map.get(colours.$xf-colours, "white");
    width: 100%;
    padding: map.get(sizes.$xf-spacers, 2) 0;
    box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.4);
    z-index: 10;
    margin-top: 2px;
    color: map.get(colours.$xf-colours, "black");
    max-height: 200px;
    overflow-y: auto;

    &-top {
      transform: translateY(calc(-100% - 60px));
    }

    &-item {
      cursor: pointer;
      padding: map.get(sizes.$xf-spacers, 1) map.get(sizes.$xf-spacers, 2);

      &:hover {
        background: rgb(238, 238, 238);
      }
    }
  }

  &-arrow {
    transition: all 0.4s ease-out;

    &-active {
      transform: rotate(180deg);
    }
  }
}
</style>
