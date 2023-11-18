import { describe, it } from "vitest";
import { shallowMount } from "@vue/test-utils";

import XfSidebar from "../XfSidebar.vue";

describe("XfSidebar.vue", () => {
  const wrapper = shallowMount(XfSidebar, {
    props: {
      modelValue: "",
    },
  });

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
