import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { Task, Priority, TaskStatus } from "../../../shared/types";
export default function KanbanTaskItem({
  task,
}: {task:Task
}) {
  const { ref } = useDraggable({ id: task.id });
  return (
    <>
        <Card ref={ref} size="sm" className="my-4 w-full">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>
              This card uses the small size variant.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>{task.description}</p>
            <p>STATUS:{TaskStatus[task.status]}</p>
            <p>Priority: {Priority[task.priority]}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Action
            </Button>
          </CardFooter>
        </Card>
    </>
  );
}
