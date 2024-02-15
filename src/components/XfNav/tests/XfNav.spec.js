import { describe, it } from "vitest";
import { shallowMount } from "@vue/test-utils";

import XfNav from "../XfNav.vue";

describe("XfNav.vue", () => {
  const wrapper = shallowMount(XfNav, {
    props: {
      modelValue: "",
    },
  });

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
