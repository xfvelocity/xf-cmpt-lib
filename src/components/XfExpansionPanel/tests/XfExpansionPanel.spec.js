import { mount } from "@vue/test-utils";

import XfExpansionPanel from "../XfExpansionPanel.vue";

describe("XfExpansionPanel.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfExpansionPanel, {
      props: {
        modelValue: "",
        list: [],
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
