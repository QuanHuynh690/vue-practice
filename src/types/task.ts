export interface TaskItem {
  id: string;
  text: string;
  day: string;
  reminder: boolean;
}
export type TasksList = Array<TaskItem>;
