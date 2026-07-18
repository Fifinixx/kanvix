"use client";

import { useOrganization } from "@/app/application/context/organization-context";
import { KanbanEmptyBoard } from "./kanban-empty";
import KanbanProjectSkeleton from "./kanban-project-skeleton";
import { useProject } from "@/app/application/context/project-context";
export default function KanbanBoard() {
  const { projects, selectedProject, loadingProj } = useProject();
  const {loadingOrg} = useOrganization()
  if (projects?.length === 0) return <KanbanEmptyBoard />;
  if (loadingProj || loadingOrg) return <KanbanProjectSkeleton />;
  return (
    <>
      <div>Project name: {selectedProject && selectedProject.name}</div>
    </>
  );
}
