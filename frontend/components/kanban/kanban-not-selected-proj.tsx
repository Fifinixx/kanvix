// import { FolderOpen, ArrowLeft, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function KanbanNoProjectSelected() {
//   return (
//     // The container takes up full height of its parent and uses a dashed border
//     // which is a standard UI pattern for empty states.
//     <div className="flex h-full min-h-[500px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-8 text-center animate-in fade-in-50">

//       <div className="flex max-w-[420px] flex-col items-center gap-4">
//         {/* Icon Container */}
//         <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
//           <FolderOpen className="h-10 w-10 text-muted-foreground" />
//         </div>

//         {/* Text content */}
//         <div className="space-y-2">
//           <h2 className="text-2xl font-semibold tracking-tight">
//             No Project Selected
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             Select an existing project from the sidebar to view its details, manage settings, or continue your work.
//           </p>
//         </div>

//         {/* Visual cue pointing to the sidebar */}
//         <div className="mt-4 flex items-center gap-2 rounded-md bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
//           <ArrowLeft className="h-4 w-4 animate-pulse text-primary" />
//           <span>Select from the left sidebar</span>
//         </div>

//         {/* Optional: A quick action to create a new project right from here */}
//         <div className="mt-6 flex items-center gap-4">
//           <div className="h-[1px] flex-1 bg-border" />
//           <span className="text-xs uppercase text-muted-foreground">Or</span>
//           <div className="h-[1px] flex-1 bg-border" />
//         </div>

//         <Button className="mt-4 w-full sm:w-auto" variant="outline">
//           <Plus className="mr-2 h-4 w-4" />
//           Create New Project
//         </Button>
//       </div>

//     </div>
//   );
// }

import { FolderOpen, ArrowLeft, ArrowUpRightIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectAddDialog } from "../project-add-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function KanbanNoProjectSelected() {
  return (
    <div className="h-full flex items-center justify-center">
      <Empty className="border border-dashed size-100 bg-sidebar">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No Project Selected</EmptyTitle>
          <EmptyDescription>
            Select an existing project from the sidebar to view its details,
            manage settings, or continue your work.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <div className="flex flex-col gap-2 justify-center items-center">
            <ProjectAddDialog />
            <span>OR</span>
            <Button variant="outline"><ArrowLeft className="h-4 w-4 animate-pulse text-primary" />Select from the right sidebar</Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </div>
  );
}
