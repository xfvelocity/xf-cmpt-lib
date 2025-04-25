import { shallowMount } from "@vue/test-utils";
import { describe, it } from "vitest";

import XfSelect from "../XfSelect.vue";

let wrapper;

describe("XfSelect.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(XfSelect, {
      props: {
        label: "",
        modelValue: "",
        options: [
          {
            text: "Test 1",
            value: "test1",
          },
          {
            text: "Test 2",
            value: "test2",
          },
        ],
      },
    });
  });

  it("Component is mounted", () => {
    expect(wrapper.findComponent(XfSelect).exists()).toBe(true);
  });

  it("autocompleteChange - searches results for matching", async () => {
    await wrapper.setProps({ autocomplete: true });
    wrapper.vm.autocompleteSearch = "Test 1";
    await wrapper.vm.autocompleteChange();

    await new Promise((r) => setTimeout(r, 600));

    expect(wrapper.vm.showOptions).toStrictEqual([
      { text: "Test 1", value: "test1" },
    ]);

    wrapper.vm.autocompleteSearch = "T";
    await wrapper.vm.autocompleteChange();

    await new Promise((r) => setTimeout(r, 600));

    expect(wrapper.vm.showOptions).toStrictEqual([]);
  });

  it("optionSelected - emit value", async () => {
    await wrapper.setProps({ autocomplete: true });

    wrapper.vm.isSelectActive = true;
    await wrapper.vm.optionSelected({ text: "Test 1", value: "test1" });

    expect(wrapper.emitted("update:modelValue")[0]).toStrictEqual(["test1"]);
  });

  it("toggleSelect - selectActive set based on val passed", async () => {
    expect(wrapper.vm.isSelectActive).toBe(false);
    await wrapper.vm.toggleSelect(true);

    expect(wrapper.vm.isSelectActive).toBe(true);
  });

  it("modelValue - watch finds matching value", async () => {
    await wrapper.setProps({ modelValue: { value: "test2", text: "Test 2" } });
    expect(wrapper.vm.selected).toBe("Test 2");

    await wrapper.setProps({ modelValue: "test1" });
    expect(wrapper.vm.selected).toBe("Test 1");
  });
});

describe("XfSelect - autocomplete mount", () => {
  it("reset showOptions if autocomplete", () => {
    wrapper = shallowMount(XfSelect, {
      props: {
        modelValue: "",
        label: "",
        options: [
          {
            text: "Test 1",
            value: "test1",
          },
        ],
        autocomplete: true,
      },
    });

    expect(wrapper.vm.showOptions).toStrictEqual([]);
  });
});
