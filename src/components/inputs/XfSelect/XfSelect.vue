<template>
  <div
    class="xf-select"
    :tabindex="autocomplete ? '' : '0'"
    ref="selectElement"
    @keydown.tab="toggleSelect(false)"
    @focus="toggleSelect(true)"
  >
    <div
      class="xf-select-toggle"
      :class="{
        'xf-select-populated': !!modelValue || autocompleteSearch,
        'xf-select-active': isSelectActive,
      }"
      @click="toggleSelect(true)"
    >
      <label class="xf-text-16">{{ label }}</label>
      <input
        v-if="autocomplete"
        class="xf-select-input xf-text-16"
        v-model="autocompleteSearch"
        ref="autocompleteInput"
        :tabindex="autocomplete ? '0' : ''"
        @input="autocompleteChange"
        @focus="toggleSelect(true)"
      />
      <span v-else class="xf-text-16">
        {{ selected }}
      </span>

      <div class="xf-flex-grow" />
      <xf-loading v-if="loading" class="xf-pr-2" :size="16" />
      <xf-icon
        class="xf-mb-1 xf-mr-1 xf-select-arrow"
        :class="{ 'xf-select-arrow-active': isSelectActive }"
        :height="12"
        :width="8"
        :src="getImageUrl('icons/arrow-down.svg')"
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { SelectOption } from "@/types/app.types";
import { getImageUrl, debounce } from "@/composables/generic";
import { onClickOutside } from "@vueuse/core";

import XfIcon from "@/components/XfIcon/XfIcon.vue";
import XfLoading from "@/components/XfLoading/XfLoading.vue";

// ** Props **
const props = withDefaults(
  defineProps<{
    modelValue: string | number | SelectOption | null;
    label: string;
    options: SelectOption[];
    valueOnly?: boolean;
    autocomplete?: boolean;
    outsideRequest?: Function;
    position?: string;
  }>(),
  {
    valueOnly: true,
    position: "bottom",
  }
);

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
            .includes(autocompleteSearch.value.toLowerCase())
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
  if (option.text !== selected.value) {
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

    if (!val && autocompleteSearch.value && !selectedMatchesSearch) {
      autocompleteSearch.value = "";
      noResults.value = false;
    }
  }
};

onClickOutside(selectElement, () => {
  if (isSelectActive.value) {
    toggleSelect(false);
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
    // When passing a value to the autocomplete, if there are no options shown then run the search the set them
    if (
      props.autocomplete &&
      props.outsideRequest &&
      !showOptions.value.length
    ) {
      autocompleteSearch.value = (value as number)?.toString();

      await setOptions();
    }

    // If value isn't an object - find its matching option and get the text value
    if (typeof value !== "object") {
      const matchingOption: SelectOption | undefined = showOptions.value.find(
        (option) => option.value == value
      );
      const val: string = matchingOption ? matchingOption.text : "";

      selected.value = val;
      autocompleteSearch.value = val;
    } else {
      const val: string = (value as SelectOption).text || "";

      selected.value = val;
      autocompleteSearch.value = val;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.xf-select {
  position: relative;

  label {
    position: absolute;
    left: 0;
    bottom: 3px;
    text-transform: uppercase;
    color: map-get($xf-colours, "black");
    transition: all 0.4s ease;
  }

  &-toggle {
    display: flex;
    align-items: flex-end;
    padding: map-get($xf-spacers, 1) 0;
    border-bottom: 1px solid map-get($xf-colours, "black");
    position: relative;
    height: 60px;
    color: map-get($xf-colours, "black");
  }

  &:focus {
    border: 0;
    outline: none;

    .xf-select-toggle {
      border-bottom: 2px solid map-get($xf-colours, "black");
    }
  }

  &-input {
    background: transparent;
    width: 100%;
    border: 0;
    margin-right: map-get($xf-spacers, 1);
    margin-left: -2px;

    &:focus {
      outline: none;
    }
  }

  &-items {
    position: absolute;
    background: map-get($xf-colours, "white");
    width: 100%;
    padding: map-get($xf-spacers, 2) 0;
    box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.4);
    z-index: 10;
    margin-top: 2px;
    color: map-get($xf-colours, "black");
    max-height: 200px;
    overflow-y: auto;

    &-top {
      transform: translateY(calc(-100% - 60px));
    }

    &-item {
      cursor: pointer;
      padding: map-get($xf-spacers, 1) map-get($xf-spacers, 2);

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

  &-active {
    border-bottom: 2px solid map-get($xf-colours, "black");
  }

  &-active,
  &-populated {
    label {
      transform-origin: left;
      transform: scale(0.75) translateY(-35px);
    }
  }
}
</style>
