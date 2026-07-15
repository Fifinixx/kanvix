"use client";

import { KanbanTaskItem } from "./kanban-task-item";
import { KanbanEmptyBoard } from "./kanban-empty";
import { useProject } from "@/app/application/context/project-context";
export default function KanbanBoard() {
  const { projects } = useProject();
  if (projects?.length === 0) return <KanbanEmptyBoard />;
  return (
    <>
      <div>Project name: {projects && projects[0].name}</div>
    </>
  );
}
