import { mount } from "@vue/test-utils";

import XfTextInput from "../XfTextInput.vue";

describe("XfTextInput.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(XfTextInput, {
      props: {
        modelValue: "",
      },
    });
  });

  it("is mounted", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("emits on update", () => {
    const input = wrapper.find('[data-test-id="xf-text-input-input"]');

    input.setValue("test");

    expect(wrapper.emitted("update:modelValue")[0]).toStrictEqual(["test"]);
  });

  it("error -  display message", async () => {
    await wrapper.setProps({ errorMessages: ["error"] });

    expect(wrapper.find('[data-test-id="xf-text-input-error"]').exists()).toBe(
      true,
    );
  });
});
