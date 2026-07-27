"use client";

import { KanbanActiveUsers } from "./kanban-active-users";
import { Separator } from "../ui/separator";
import { ProjectDeleteDialog } from "../project-delete-dialog";
import { useOrganization } from "@/app/application/context/organization-context";
import { KanbanEmptyBoard } from "./kanban-empty";
import KanbanProjectSkeleton from "./kanban-project-skeleton";
import { useProject } from "@/app/application/context/project-context";
import KanbanNoProjectSelected from "./kanban-not-selected-proj";
import KanbanTasks from "./kanban-tasks";

export default function KanbanProject() {
  const { projects, loadingProj, selectedProject } = useProject();
  const { loadingOrg, selectedProjectId } = useOrganization();
  if (loadingProj || loadingOrg) return <div className="w-full h-full"><KanbanProjectSkeleton /></div>;
  if (!projects || projects?.length === 0) return <div className="h-full flex justify-center"><KanbanEmptyBoard /></div>
  if(!selectedProject || !selectedProject?.id ) return <div className="h-full flex justify-center"><KanbanNoProjectSelected /></div>

  return (
    <>
      <header className="flex justify-between items-start p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">{selectedProject?.name}</h1>
          <ProjectDeleteDialog selectedProjectId={selectedProject?.id} />
        </div>
        <KanbanActiveUsers />
      </header>
      <Separator />
      <div className="p-4">
        <div className="flex flex-col justify-start items-start">
          <p className="whitespace-pre-wrap max-w-xs text-xs font-light">
            {selectedProject?.description}
          </p>
        </div>
        <KanbanTasks />
      </div>
    </>
  );
}
