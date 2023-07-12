import { mount } from "@vue/test-utils";

import XfMenu from "../XfMenu.vue";

describe("XfMenu.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfMenu, {
      props: {
        modelValue: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
