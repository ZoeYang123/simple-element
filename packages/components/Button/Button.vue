<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";
defineOptions({
  name: "SimButton",
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();
</script>

<template>
  <component
    :is="props.tag"
    ref="_ref"
    class="sim-button"
    :class="{
      [`sim-button--${type}`]: type,
      [`sim-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <slot></slot
  ></component>
</template>

<style scoped>
@import "./style.css";
</style>
