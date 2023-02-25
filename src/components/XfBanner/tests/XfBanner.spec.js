import { mount } from "@vue/test-utils";

import XfBanner from "../XfBanner.vue";

describe("XfBanner.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfBanner);
  });

  it("is mounted", () => {
    expect(wrapper.findComponent(XfBanner).exists()).toBe(true);
  });
});
