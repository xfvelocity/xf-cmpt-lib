import { mount } from "@vue/test-utils";

import XfLoadingBar from "../XfLoadingBar.vue";

describe("XfLoadingBar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfLoadingBar, {
      props: {
        modelValue: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
