"use client";

import { useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { closestCorners } from "@dnd-kit/collision";
import { Task, TaskPriority, TaskStatus } from "../../../shared/types";
import { GripVerticalIcon } from "lucide-react";
import { Feedback, PointerSensor, KeyboardSensor } from "@dnd-kit/dom";

const KanbanTaskOverlay = memo(function ({
  column,
  index,
  task,
}: {
  column:string,
  index: number;
  task: Task;
}) {
    const group = column;
  const { ref, handleRef, isDragging } = useSortable({
    id: task.id,
    index,
    group,
    type: "task",
    accept: "task",
        plugins: [Feedback.configure({ feedback: "clone" })],
    data:{group, index, task},
  });
  return (
    <>
      <Card
        ref={ref}
        size="sm"
        className={`my-4 w-full}`}
      >
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>
            This card uses the small size variant.
          </CardDescription>
          <CardAction>
            <Button variant="outline" className="cursor-grab" ref={handleRef}>
              <GripVerticalIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p>{task.description}</p>
          <p>STATUS:{TaskStatus[task.status]}</p>
          <p>Priority: {TaskPriority[task.priority]}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Action
          </Button>
        </CardFooter>
      </Card>
    </>
  );
});

export default KanbanTaskOverlay
