import { mount } from "@vue/test-utils";

import XfCheckbox from "../XfCheckbox.vue";

describe("XfCheckbox", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfCheckbox, {
      props: {
        label: "test",
        name: "test",
        modelValue: false,
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
