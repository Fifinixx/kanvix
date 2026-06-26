import { Monitor, Globe, ChevronRight } from "lucide-react";

import { Sidebar } from "@/components/ui/sidebar";
import SidebarFooterSection from "./sidebarFooter";
import SideBarHeaderSection from "./sidebarHeader";
import SidebarContentSection from "./sidebarContent";

export function AppSidebar() {
  return (
    <Sidebar>
      <SideBarHeaderSection />

      <SidebarContentSection />

      <SidebarFooterSection />
    </Sidebar>
  );
}
