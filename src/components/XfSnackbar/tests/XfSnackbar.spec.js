import { mount } from "@vue/test-utils";

import XfSnackbar from "../XfSnackbar.vue";

describe("XfSnackbar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfSnackbar, {
      props: {
        modelValue: "",
        text: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
