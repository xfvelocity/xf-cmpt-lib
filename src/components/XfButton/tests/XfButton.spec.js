import { mount } from "@vue/test-utils";

import XfButton from "../XfButton.vue";

describe("XfButton", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfButton, {
      props: {
        text: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("buttonClass", () => {
    describe("outlined", () => {
      it("is outlined", async () => {
        await wrapper.setProps({ backgroundColour: "black", outlined: true });

        expect(wrapper.vm.buttonClass).toContain("xf-bg-none xf-border-black");
      });

      it("is filled", async () => {
        await wrapper.setProps({ backgroundColour: "black", outlined: false });

        expect(wrapper.vm.buttonClass).toContain("xf-bg-black");
      });
    });

    describe("fontSize", () => {
      it("custom font size", async () => {
        await wrapper.setProps({ fontSize: 20 });

        expect(wrapper.vm.buttonClass[1]).toContain("xf-text-20");
      });
    });
  });
});
