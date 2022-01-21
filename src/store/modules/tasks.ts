/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TasksList, TaskItem } from "@/types/task";
import axios from "axios";

export type State = {
  tasks: TasksList;
  count: number;
};
const state = {
  tasks: [],
  count: 0,
};

const getters = {
  allTasks: (state: State): TasksList => state.tasks,
  count: (state: State): number => state.count,
};

const actions = {
  getTasks: async ({ commit }: any): Promise<any> => {
    const res = await axios.get("api/tasks");
    commit("setTasks", res.data);
  },
  getTask: async ({ commit }: any, id: string): Promise<any> => {
    const res = await axios.get(`api/tasks/${id}`);
    console.log("res :>> ", res);
    return res.data;
  },
  addTask: async ({ commit }: any, task: TaskItem): Promise<any> => {
    const res = await axios.post("api/tasks", task);
    commit("addTask", res.data);
  },
  updateTask: async ({ commit }: any, task: TaskItem): Promise<any> => {
    const res = await axios.put(`api/tasks/${task.id}`, task);
    commit("updateTask", res.data);
  },
  deleteTask: async ({ commit }: any, id: string): Promise<any> => {
    if (confirm("Are you sure?")) {
      const res = await axios.delete(`api/tasks/${id}`);
      res.status == 200
        ? commit("deleteTask", id)
        : alert("Error deleting task");
    }
  },
  filterTask: async ({ commit }: any, e: any) => {
    const pageSize = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const res = await axios.get(`api/tasks?_limit=${pageSize}`);
    commit("setTasks", res.data);
  },
};

const mutations = {
  setTasks: (state: State, tasks: TasksList): any => (
    (state.tasks = tasks), (state.count = tasks.length)
  ),
  addTask: (state: State, task: TaskItem): any => (
    state.tasks.push(task), (state.count = state.count + 1)
  ),
  updateTask: (state: State, task: TaskItem): any =>
    (state.tasks = state.tasks.map((t) =>
      t.id === task.id ? { ...t, reminder: task.reminder } : t
    )),
  deleteTask: (state: State, id: string): any => (
    (state.tasks = state.tasks.filter((task) => task.id !== id)),
    (state.count = state.count - 1)
  ),
};

export default { state, getters, actions, mutations };
