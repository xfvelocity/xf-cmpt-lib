import { mount } from "@vue/test-utils";

import XfLoadingSpinner from "../XfLoadingSpinner.vue";

describe("XfLoadingSpinner.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfLoadingSpinner, {
      props: {
        modelValue: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
