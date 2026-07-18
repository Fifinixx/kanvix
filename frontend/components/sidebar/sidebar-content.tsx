"use client";

import { Monitor, Globe, ChevronRight } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useProject } from "@/app/application/context/project-context";
import { SidebarContentSkeleton } from "./sidebar-content-skeleton";
import { useOrganization } from "@/app/application/context/organization-context";

export default function SidebarContentSection() {
  const { selectedOrganization, loadingOrg } = useOrganization();
  const { selectedProject, switchProject } = useProject();
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarMenu>
            {loadingOrg ? (
              <SidebarContentSkeleton />
            ) : selectedOrganization?.projects?.length === 0 ? (
              <p className="mx-2 mt-4 text-xs text-primary">
                No Projects found
              </p>
            ) : (
              selectedOrganization?.projects?.map((project) => (
                // <Collapsible
                //   key={project.id}
                //   asChild
                //   defaultOpen={false}
                //   className="group/collapsible"
                // >
                <SidebarMenuItem key={project.id}>
                  {/* <CollapsibleTrigger asChild> */}
                  <SidebarMenuButton
                    isActive={project.id === selectedProject?.id}
                    className="cursor-pointer"
                    onClick={() => switchProject(project.id)}
                  >
                    {/* <project.icon className="h-4 w-4" /> */}
                    <span>{project.name}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                  {/* </CollapsibleTrigger> */}

                  {/* <CollapsibleContent>
                    <SidebarMenuSub>
                      {project.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent> */}
                </SidebarMenuItem>
                // </Collapsible>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
