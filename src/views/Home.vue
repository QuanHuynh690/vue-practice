<template>
  <transition name="addContainer">
    <AddTask @add-task="addTask" v-show="showAdd" />
  </transition>
  <Tasks
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
    :tasks="tasks"
  />
</template>

<script lang="ts">
import { TaskItem, TasksList } from "@/types/task";
import { defineComponent } from "vue";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
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
    async deleteTask(id: string) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/tasks/${id}`, {
          method: "DELETE",
        });
        res.status == 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(id: string) {
      const taskToToggle = await this.getTask(id);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async addTask(task: TaskItem) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    async getTasks() {
      const res = await fetch("api/tasks");
      const data = await res.json();
      return data;
    },
    async getTask(id: string) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.getTasks();
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
