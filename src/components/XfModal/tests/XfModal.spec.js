import { describe, it } from "vitest";
import { shallowMount } from "@vue/test-utils";

import XfModal from "../XfModal.vue";

describe("XfModal.vue", () => {
  const wrapper = shallowMount(XfModal, {
    props: {
      modelValue: false,
    },
  });

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
