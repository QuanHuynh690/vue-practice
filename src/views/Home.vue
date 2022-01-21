<template>
  <transition name="addContainer">
    <AddTask @add-task="addTask" v-show="showAdd" />
  </transition>
  <div class="subHeader">
    <span>You have {{ count }} task{{ count > 1 ? "s" : "" }} to do</span>
    <div class="filterCont">
      <label>Filter: </label>
      <select @change="filterTask($event)" class="filterSelect">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  </div>
  <Tasks
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
    :tasks="allTasks"
  />
</template>

<script lang="ts">
import { TasksList } from "@/types/task";
import { defineComponent } from "vue";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  name: "Home",
  components: { Tasks, AddTask },
  props: { showAdd: Boolean },
  data() {
    return {
      tasks: [] as TasksList,
    };
  },
  methods: {
    async toggleReminder(id: string) {
      const taskToToggle = await this.getTask(id);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      this.updateTask(updatedTask);
    },
    ...mapActions([
      "getTasks",
      "addTask",
      "deleteTask",
      "getTask",
      "updateTask",
      "filterTask",
    ]),
  },
  computed: mapGetters(["allTasks", "count"]),
  created() {
    this.getTasks();
  },
});
</script>
<style scoped>
.addContainer-enter,
.addContainer-leave-to {
  visibility: hidden;
  height: 0;
  opacity: 0;
}

.addContainer-enter-active,
.addContainer-leave-active {
  transition: all 0.5s ease-in;
}
.subHeader {
  display: flex;
  justify-content: space-between;
}
</style>
