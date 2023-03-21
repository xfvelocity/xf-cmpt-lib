import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

import XfLoading from "../XfLoading.vue";

describe("XfLoading.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfLoading);
  });

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
