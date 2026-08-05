"use client";

import { memo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import KanbanTaskItem from "./kanban-task-item";
import { Task } from "../../../shared/types";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { TaskAddDialog } from "../task-add-dialog";
import { PlusIcon } from "lucide-react";

const KabnabTaskColumn = memo(function ({
  column,
  tasks,
  index,
}: {
  column: string;
  tasks: Task[];
  index: number;
}) {
  const { ref } = useSortable({
    id: column,
    index,
    accept: ["column", "task"],
    collisionPriority: CollisionPriority.Normal,
    type: "column",
  });

  return (
    <>
      <ScrollArea
        ref={ref}
        className="relative w-1/3 min-h-100 border rounded-xl"
      >
        <div className="w-full z-5 h-10 bg-accent rounded-t-md absolute top-0">
          <h3 className="text-center p-2 ">Tasks {column}</h3>
          <div className="absolute right-3 top-1/2 -translate-y-1/2"><TaskAddDialog /></div>
        </div>
        <div className="z-3 relative flex flex-col gap-4 p-4 mt-10">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <p>No tasks found</p>
            </div>
          ) : (
            tasks.map((item, index) => {
              return (
                <KanbanTaskItem
                  column={column}
                  index={index}
                  key={item.id}
                  task={item}
                />
              );
            })
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
});

export default KabnabTaskColumn;
