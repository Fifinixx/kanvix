// "use client";

// import { memo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardAction,
// } from "@/components/ui/card";
// import { useSortable } from "@dnd-kit/react/sortable";
// import { Task, Priority, TaskStatus } from "../../../shared/types";
// import { GripVerticalIcon, MessageCircle } from "lucide-react";
// import { Feedback } from "@dnd-kit/dom";
// import { useUser } from "@/app/application/context/user-context";

// const KanbanTaskItem = memo(function ({
//   column,
//   index,
//   task,
// }: {
//   column: string;
//   index: number;
//   task: Task;
// }) {
//   const group = column;
//   const { ref, handleRef, isDragging } = useSortable({
//     id: task.id,
//     index,
//     group,
//     type: "task",
//     accept: "task",
//     plugins: [Feedback.configure({ feedback: "clone" })],
//     data: { group, index, task },
//   });
//   const colors = {
//     TODO: { border: "border-red-500", text: "text-red-500" },
//     IN_PROGRESS: { border: "border-yellow-500", text: "text-yellow-500" },
//     DONE:{ border:"border-green-500", text:"text-green-500"}
//   };
//   const {user} = useUser()
//   type ColorType = keyof typeof colors;
//   return (
//     <>
//       <Card
//         ref={ref}
//         size="sm"
//         data-shadow={isDragging || undefined}
//         className={`border-l-3  ${colors[column as ColorType].border} w-full data-dnd-placeholder:opacity-50`}
//       >
//         <CardHeader>
//           <CardTitle>{task.title}</CardTitle>
//           <CardDescription>
//             Added by {user?.firstName}
//           </CardDescription>
//           <CardAction>
//             <Button variant="outline" className="cursor-grab" ref={handleRef}>
//               <GripVerticalIcon />
//             </Button>
//           </CardAction>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-2">
//           <p>{task.description}</p>
//           <p className={`${colors[column as ColorType].text} `}>
//             STATUS:{TaskStatus[task.status]}
//           </p>
//           <p>Priority: {Priority[task.priority]}</p>
//         </CardContent>
//         <CardFooter className="flex justify-around w-full py-2">
//           <Button variant="outline"  >
//             Action
//           </Button>
//           <Button variant="outline"><MessageCircle /></Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// });

// export default KanbanTaskItem;

"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { useSortable } from "@dnd-kit/react/sortable";
import { Task, TaskPriority, TaskStatus } from "../../../shared/types";
import { GripVerticalIcon, MessageCircle, Flag, Info } from "lucide-react";
import { Feedback } from "@dnd-kit/dom";
import { useUser } from "@/app/application/context/user-context";
import { TaskDeleteDialog } from "../task-delete-dialog";
const KanbanTaskItem = memo(function ({
  column,
  index,
  task,
}: {
  column: string;
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
    data: { group, index, task },
  });

  const { user } = useUser();

  const columnStyles = {
    TODO: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-600",
    },
    "IN-PROGRESS": {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    DONE: {
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-600",
    },
  };

  const priorityStyles = {
    HIGH: "text-red-500 bg-red-500/10",
    MEDIUM: "text-yellow-500 bg-yellow-500/10",
    LOW: "text-blue-500 bg-blue-500/10",
  };

  type ColumnType = keyof typeof columnStyles;
  const currentStyle = columnStyles[column as ColumnType] || columnStyles.TODO;

  return (
    <Card
      ref={ref}
      className={`
        group relative flex flex-col w-full border-l-4  bg-card transition-all duration-200 ease-in-out
        hover:shadow-md ${currentStyle.border} 
        data-dnd-placeholder:opacity-50
        ${isDragging ? "shadow-xl scale-[1.02] cursor-grabbing ring-1 ring-primary/20" : ""}
      `}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
          <span className="flex items-center gap-4">
            {task.title}
            <TaskDeleteDialog />
          </span>
        </CardTitle>
        <CardAction className="ml-2 mt-0">
          <div
            ref={handleRef}
            className="cursor-grab p-1 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground rounded-md group-hover:text-muted-foreground"
          >
            <GripVerticalIcon size={16} />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="px-4 pb-3 flex flex-col gap-3">
        {/* Subdued description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-neutral-500">Priority:</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${priorityStyles[TaskPriority[task.priority] as keyof typeof priorityStyles]}`}
          >
            <Flag size={10} />
            {TaskPriority[task.priority]}
          </span>
          <span className="text-[10px] font-semibold text-neutral-500">Status:</span> 
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${priorityStyles[TaskPriority[task.priority] as keyof typeof priorityStyles]}`}
          >
            <Info size={10} />
            {TaskStatus[task.status]}
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 flex items-center justify-between border-t bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {user?.firstName || "Unknown"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle size={14} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

export default KanbanTaskItem;
