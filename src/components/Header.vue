<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      @btn-click="$emit('toggle-add-task')"
      :text="!showAdd ? 'Add Task' : 'Close'"
      :color="!showAdd ? 'green' : 'red'"
      v-show="homePage"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";
export default defineComponent({
  name: "Header",
  props: {
    title: String,
    showAdd: Boolean,
  },
  components: {
    Button,
  },
  emits: ["toggle-add-task"],
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else return false;
    },
  },
});
</script>
<style scope>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
