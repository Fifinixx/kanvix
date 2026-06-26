"use client";

import { useState } from "react";
import {
  ChevronsUpDown,
  Plus,
  Building,
  Briefcase
} from "lucide-react"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const workspaces = [
  {
    name: "RAYMOND PC HQ",
    plan: "Enterprise",
    icon: Building,
  },
  {
    name: "Personal Projects",
    plan: "Free",
    icon: Briefcase,
  },
]

export default function SideBarHeaderSection(){
      const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0])
    return <>
              {/* --- HEADER: WORKSPACE SWITCHER --- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <activeWorkspace.icon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeWorkspace.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {activeWorkspace.plan}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Workspaces
                </DropdownMenuLabel>
                {workspaces.map((workspace, index) => (
                  <DropdownMenuItem
                    key={workspace.name}
                    onClick={() => setActiveWorkspace(workspace)}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <workspace.icon className="size-4 shrink-0" />
                    </div>
                    {workspace.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Add workspace</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </>
}