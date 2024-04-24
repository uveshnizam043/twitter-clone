<template>
    <div :style="{ height: `${size}px`, width: `${size}px` }" style="cursor: pointer;">
      <component
        :is="icon"
        role="img"
        :alt="name"
        :style="{ height: `${size}px`, width: `${size}px`,color:`${color}` }"
        class="hp-icon"
      />
    </div>
  </template>
  
  <script setup>
  import { computed, defineAsyncComponent } from "vue";
  
  const props = defineProps({
    name: {
      type: String,
      default: "cog",
    },
    size: {
      default: 24,
      type: [Number, String],
    },
    color: {
      type: String,
    },
  });
  
  const icon = computed(() => {
    const forceComputed = props.name;
    return defineAsyncComponent(() =>
      import(`../assets/icons/${forceComputed}.svg`)
    );
  });
  </script>
  
  <style lang="scss" scoped></style>
  