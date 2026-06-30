import { KanbanTaskItem } from "./kanban-task-item";
import { KanbanEmptyBoard } from "./kanban-empty";

export default function KanbanBoard() {
  return (
    <>
      <KanbanEmptyBoard />
    </>
    // <div className="flex justify-around items-start p-6">
    //   <div className="flex flex-col justify-center items-center">
    //     <h1 className="text-3xl text-primary font-semibold">Done</h1>
    //     <KanbanTaskItem />
    //   </div>
    //   <div>
    //     <h1 className="text-3xl text-primary font-semibold">In Progress</h1>
    //   </div>
    //   <div>
    //     <h1 className="text-3xl text-primary  font-semibold">Pending</h1>
    //   </div>
    // </div>
  );
}
