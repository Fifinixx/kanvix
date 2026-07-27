"use client";

import { useState } from "react";
import KabnabTaskTodo from "./kanban-task-todo";
import KanbanTaskCompleted from "./kanban-task-completed";
import KabnabTaskInProgress from "./kanban-task-in-progress";
import { DragDropProvider } from "@dnd-kit/react";
import { Task, Priority, TaskStatus } from "../../../shared/types";
import KabnabTaskCompleted from "./kanban-task-completed";

const TASKS_LIST = [
  {
    id: "fadfadfadf",
    title: "Task 1",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: Priority.MEDIUM,
  },
  {
    id: "fdafg35",
    title: "Task 2",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: Priority.MEDIUM,
  },
  {
    id: "sfgsfg454",
    title: "Task 3",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: Priority.MEDIUM,
  },
  {
    id: "jfbxwrtrwt",
    title: "Task 4",
    status: TaskStatus.IN_PROGRESS,
    description:
      "Sample in-progress task description. This task needs to be completed!",
    projectId: "Proj466344",
    priority: Priority.MEDIUM,
  },
  {
    id: "ghgdh",
    title: "Task 5",
    status: TaskStatus.DONE,
    description:
      "Sample in-progress task description. This task needs to be completed!",
    projectId: "Proj466344",
    priority: Priority.MEDIUM,
  },
  //      {
  //     id: "hfjfgh",
  //     title: "Task 4",
  //     status: TaskStatus.IN_PROGRESS,
  //     description:
  //       "Sample in-progress task description. This task needs to be completed!",
  //     projectId: "Proj466344",
  //     priority: Priority.MEDIUM,
  //   },
  //      {
  //     id: "dghdgh",
  //     title: "Task 4",
  //     status: TaskStatus.IN_PROGRESS,
  //     description:
  //       "Sample in-progress task description. This task needs to be completed!",
  //     projectId: "Proj466344",
  //     priority: Priority.MEDIUM,
  //   },
];

export default function KanbanTasks() {
  const [tasks, setTasks] = useState<Task[]>(TASKS_LIST);
  return (
    <>
      <DragDropProvider
        onDragEnd={(event) => {
          if (
            event.canceled ||
            event === null ||
            !event.operation?.target ||
            !event.operation?.source
          ) {
            return;
          }
          const item = tasks.find(
            (item) => item.id === event.operation?.source?.id,
          );
          if (!item) return;
          const filteredTask = tasks.filter((task) => task.id !== item.id);
          switch (true) {
            case event.operation.target.id === "todo-droppable":
              filteredTask.push({ ...item, status: TaskStatus.TODO });
              setTasks(filteredTask);
              break;
            case event.operation.target.id === "in-progress-droppable":
              filteredTask.push({ ...item, status: TaskStatus.IN_PROGRESS });
              setTasks(filteredTask);
              break;
            case event.operation.target.id === "done-droppable":
              filteredTask.push({ ...item, status: TaskStatus.DONE });
              setTasks(filteredTask);
              break;
            default:
                setTasks(prev => prev)
          }
        }}
      >
        <div className="flex justify-center items-center gap-4 ">
          <div className="w-1/3">
            <KabnabTaskTodo tasks={tasks} />
          </div>
          <div className="w-1/3">
            <KabnabTaskInProgress tasks={tasks} />
          </div>
          <div className="w-1/3">
            <KabnabTaskCompleted tasks={tasks} />
          </div>
        </div>
      </DragDropProvider>
    </>
  );
}
