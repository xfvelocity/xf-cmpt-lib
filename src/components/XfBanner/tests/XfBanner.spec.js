import { mount } from "@vue/test-utils";
import { isHandheld } from "@/composables/mediaQueries";

import XfBanner from "@/components/XfBanner.vue";

describe("XfBanner.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfBanner);
  });

  it("is mounted", () => {
    expect(wrapper.findComponent(XfBanner).exists()).toBe(true);
  });

  describe("bannerTextStyle", () => {
    it("sets styles from passed value", () => {
      expect(
        wrapper.vm.bannerTextStyle({
          text: "test",
          offsetX: 20,
          fontSize: 20,
        })
      ).toBe("transform: rotate(-3deg) translateX(20px); font-size: 20px");
    });

    it("sets responsive fontSize", () => {
      isHandheld.value = true;

      expect(
        wrapper.vm.bannerTextStyle({
          fontSize: {
            mobile: 14,
            tablet: 16,
          },
        })
      ).toBe("transform: rotate(-3deg) translateX(0px); font-size: 14px");
    });

    it("sets styles from defaults if no values", () => {
      expect(wrapper.vm.bannerTextStyle({})).toBe(
        "transform: rotate(-3deg) translateX(0px); font-size: 24px"
      );
    });
  });

  describe("bannerOffset", () => {
    it("gets highest offsetX", async () => {
      await wrapper.setProps({
        titles: [{ offsetX: 10 }, { offsetX: 5 }, { offsetX: 45 }],
      });

      expect(wrapper.vm.bannerOffset).toBe(45);
    });

    it("if no offsetX, do not add to offset array", async () => {
      await wrapper.setProps({
        titles: [{}, { offsetX: 10 }],
      });

      expect(wrapper.vm.bannerOffset).toBe(10);
    });
  });
});
