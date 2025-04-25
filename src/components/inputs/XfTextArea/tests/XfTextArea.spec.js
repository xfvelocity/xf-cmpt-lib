import { mount } from "@vue/test-utils";

import XfTextArea from "../XfTextArea.vue";

describe("XfTextArea.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfTextArea, {
      props: {
        modelValue: "",
        label: "",
        name: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("emits on update", () => {
    const input = wrapper.find('[data-test-id="xf-text-area-input"]');

    input.setValue("test");

    expect(wrapper.emitted("update:modelValue")[0]).toStrictEqual(["test"]);
  });

  it("error -  display message", async () => {
    await wrapper.setProps({ errorMessages: ["error"] });

    expect(wrapper.find('[data-test-id="xf-text-area-error"]').exists()).toBe(
      true,
    );
  });
});
