import { mount } from "@vue/test-utils";

import XfFuzzyImage from "../XfFuzzyImage.vue";

describe("XfFuzzyImage.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfFuzzyImage, {
      props: {
        img: "",
        minImg: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
