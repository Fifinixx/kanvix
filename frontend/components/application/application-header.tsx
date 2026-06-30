"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";

export default function AppHeader({
  projectName = "Untitled project",
  onNewProject,
}: {
  projectName?: string;
  onNewProject?: () => void;
}) {
  return (
    <header className="absolute w-full bg-sidebar top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b  px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical"  />
      <h1 className="truncate text-sm font-semibold">{projectName}</h1>

      {/* Right: actions */}
      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" className="gap-1.5" onClick={onNewProject}>
          <PlusIcon />
          New project
        </Button>
      </div>
    </header>
  );
}
