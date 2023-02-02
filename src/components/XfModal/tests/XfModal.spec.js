import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

import XfModal from "../XfModal.vue";

describe("XfModal.vue", () => {
  const wrapper = mount(XfModal);

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
