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
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SidebarContentSection() {
  const projects = [
    {
      name: "RAYMOND PC",
      icon: Monitor,
      items: [
        { title: "Dashboard", url: "/projects/raymond-pc/dashboard" },
        { title: "Products", url: "/projects/raymond-pc/products" },
        { title: "Orders", url: "/projects/raymond-pc/orders" },
      ],
    },
    {
      name: "debmalya.dev",
      icon: Globe,
      items: [
        { title: "Analytics", url: "/projects/portfolio/analytics" },
        { title: "Blogs", url: "/projects/portfolio/blogs" },
        { title: "Settings", url: "/projects/portfolio/settings" },
      ],
    },
  ];
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((project) => (
              <Collapsible
                key={project.name}
                asChild
                defaultOpen={false}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <project.icon className="h-4 w-4" />
                      <span>{project.name}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
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
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
