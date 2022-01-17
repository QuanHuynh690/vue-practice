<template>
  <button @click="onClick" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    onClick() {
      console.log("clicked");
    },
  },
});
</script>
