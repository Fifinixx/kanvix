"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ApplicationNotification } from "./application-notification";
import { useProject } from "@/app/application/context/project-context";
import { useOrganization } from "@/app/application/context/organization-context";
import { ProjectAddDialog } from "../kanban/project-add-dialog";

export default function AppHeader({
  projectName = "Untitled project",
  onNewProject,
}: {
  projectName?: string;
  onNewProject?: () => void;
}) {
  const {} = useProject();
  const { selectedOrganization } = useOrganization();
  return (
    <header className="absolute w-full bg-sidebar top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b  px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical" />

      <div className="w-full flex justify-between items-center">
        <h1 className="truncate text-sm font-semibold">
          {selectedOrganization?.name}
        </h1>
        <h1 className="truncate text-sm font-semibold">{projectName}</h1>
        <div className="flex items-center gap-4">
            <ProjectAddDialog />
          <ApplicationNotification />
        </div>
      </div>
    </header>
  );
}
