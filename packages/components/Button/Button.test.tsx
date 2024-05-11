import { describe, expect, it } from "vitest";
import SimButton from "./Button.vue";
import { mount } from "@vue/test-utils";

describe(SimButton, () => {
  // props: type
  it("should render with different types", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(SimButton, {
        props: { type: type as any },
      });
      expect(wrapper.classes(`sim-button--${type}`)).toBe(true);
    });
  });

  // props: size
  it("should render with different sizes", () => {
    const sizes = ["medium", "small", "mini"];
    sizes.forEach((size) => {
      const wrapper = mount(SimButton, { props: { size: size as any } });
      expect(wrapper.classes(`sim-button--${size}`)).toBe(true);
    });
  });

  // Props: plain, round, circle
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(SimButton, {
        props: { [prop]: true },
      });
      expect(wrapper.classes(className)).toBe(true);
    }
  );
});
