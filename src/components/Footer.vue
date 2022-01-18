<template>
  <footer>
    <h4>IShop Company</h4>
    <router-link to="/about">About</router-link>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
<style scoped>
a {
  color: #333;
}
footer {
  margin-top: 30px;
  text-align: center;
}
</style>
