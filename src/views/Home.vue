<template>
  <transition name="addContainer">
    <AddTask @add-task="addTask" v-show="showAdd" />
  </transition>
  <p>You have {{ count }} task{{ count > 1 ? "s" : "" }} to do</p>
  <Tasks
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
    :tasks="allTasks"
  />
</template>

<script lang="ts">
import { TaskItem, TasksList } from "@/types/task";
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
      //   showAdd: false,
    };
  },
  methods: {
    async toggleReminder(id: string) {
      const taskToToggle = await this.getTask(id);
      console.log("taskToToggle :>> ", taskToToggle);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      this.updateTask(updatedTask);
    },
    ...mapActions([
      "getTasks",
      "addTask",
      "deleteTask",
      "getTask",
      "updateTask",
    ]),
  },
  computed: mapGetters(["allTasks", "count"]),
  created() {
    this.getTasks();
    // this.tasks = await this.getTasks();
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
  transition: all 0.5s ease-in-out;
}
</style>
