import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

import XfIcon from "../XfIcon.vue";

describe("XfIcon.vue", () => {
  const wrapper = mount(XfIcon, {
    props: {
      src: "",
    },
  });

  it("Mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
