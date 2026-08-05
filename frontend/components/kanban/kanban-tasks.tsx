"use client";

import { useCallback, useRef, useState } from "react";
import { PointerSensor, KeyboardSensor } from "@dnd-kit/dom";
import { DragDropProvider, DragDropEventHandlers } from "@dnd-kit/react";
import { TaskPriority, TaskStatus, Task } from "../../../shared/types";
import KabnabTaskColumn from "./kanban-task-column";
import { move } from "@dnd-kit/helpers";

const TASKS_LIST = [
  {
    id: "fadfadfadf",
    title: "Task 1",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: TaskPriority.MEDIUM,
  },
  {
    id: "fdafg35",
    title: "Task 2",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: TaskPriority.MEDIUM,
  },
  {
    id: "sfgsfg454",
    title: "Task 3",
    status: TaskStatus.TODO,
    description:
      "Sample pending task description. This task needs to be completed asap!",
    projectId: "Proj466344",
    priority: TaskPriority.HIGH,
  },
  {
    id: "jfbxwrtrwt",
    title: "Task 4",
    status: TaskStatus["IN-PROGRESS"],
    description:
      "Sample in-progress task description. This task needs to be completed!",
    projectId: "Proj466344",
    priority: TaskPriority.HIGH,
  },
  {
    id: "ghgdh",
    title: "Task 5",
    status: TaskStatus.DONE,
    description:
      "Sample in-progress task description. This task needs to be completed!",
    projectId: "Proj466344",
    priority: TaskPriority.MEDIUM,
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

const sensors = [
  PointerSensor.configure({
    activatorElements(source) {
      return [source.element, source.handle];
    },
  }),

  KeyboardSensor,
];

export default function KanbanTasks() {
  const [tasks, setTasks] = useState({
    TODO: TASKS_LIST.filter((item) => item.status === TaskStatus.TODO),
    "IN-PROGRESS": TASKS_LIST.filter(
      (item) => item.status === TaskStatus["IN-PROGRESS"],
    ),
    DONE: TASKS_LIST.filter((item) => item.status === TaskStatus.DONE),
  });
  const columns = Object.keys(tasks) as Array<keyof typeof tasks>;

  const tasksSnapshot = useRef(structuredClone(tasks));
  console.log(tasks);
  //   const [draggingTask, setDraggingTask] = useState<{group:string, task:Task | undefined, index:number} | null>(null)
  return (
    <>
      <DragDropProvider
        sensors={sensors}
        onDragStart={useCallback<DragDropEventHandlers["onDragStart"]>(
          (event) => {
            tasksSnapshot.current = structuredClone(tasks);
            if (!event.operation.source) return;
            const { group, index, task } = event.operation.source.data;
            //  setDraggingTask({group, task, index});
          },
          [tasks],
        )}
        onDragOver={useCallback<DragDropEventHandlers["onDragOver"]>(
          (event) => {
            console.log(event.operation.source);
            const { source, target } = event.operation;
            //const column = target?.data.group as keyof typeof tasks;
            const column = (
              target?.type === "column" ? target.id : target?.data?.group
            ) as keyof typeof tasks;
            if (source && source.type === "column") {
              return;
            }
            if (!column || !source?.id) return;
            setTasks((prevTasks) => {
              const reorderedTasks = move(prevTasks, event);
              const updateTasks = reorderedTasks[column].map((item) => ({
                ...item,
                status: TaskStatus[column],
              }));
              return { ...reorderedTasks, [column]: updateTasks };
            });
          },
          [],
        )}
        onDragEnd={useCallback<DragDropEventHandlers["onDragEnd"]>((event) => {
          if (event.canceled) {
            setTasks(tasksSnapshot.current);
            return;
          }
          // setDraggingTask(null);
        }, [])}
      >
        <div className="flex justify-center items-start gap-4 ">
          {columns.map((item, index) => {
            return (
              <KabnabTaskColumn
                key={item}
                column={item}
                tasks={tasks[item]}
                index={index}
              />
            );
          })}
        </div>
        {/*
        For some reason, If I go the DragOverlay route, animations dissapear. 
        My pea sized brain will take some time to understand this, so just using something else.
        <DragOverlay>
           {draggingTask?.task ? <KanbanTaskOverlay task={draggingTask?.task} column={draggingTask.group} index={draggingTask.index}/> : null}
        </DragOverlay> */}
      </DragDropProvider>
    </>
  );
}
