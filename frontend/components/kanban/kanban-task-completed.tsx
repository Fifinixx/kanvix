import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import KanbanTaskItem from "./kanban-task-item";
import { Priority, Task, TaskStatus } from "../../../shared/types";
import { useDroppable } from "@dnd-kit/react";
export default function KabnabTaskDone({
  tasks,
}: {
  tasks: Task[];
}) {
  const { ref } = useDroppable({ id: "done-droppable" });
  return (
    <>
      <ScrollArea className="relative w-full h-87.5 border rounded-xl">
        <div ref={ref} className="absolute z-2 w-full h-full "> </div>
        <div className="w-full z-5 h-10 bg-accent rounded-t-md absolute top-0">
          <h3 className="text-center p-2 ">Tasks Done</h3>
        </div>
        <div className="z-3 relative px-4 mt-14">
          {tasks.map((item, index) => {
            if(TaskStatus[item.status] === "DONE")
            return <KanbanTaskItem key={item.id} task={item} />;
          })}
        </div>
        <ScrollBar orientation="horizontal" />
       
      </ScrollArea>
    </>
  );
}
