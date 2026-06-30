import { Monitor, Globe, ChevronRight } from "lucide-react";

import { Sidebar } from "@/components/ui/sidebar";
import SidebarFooterSection from "./sidebar-footer";
import SideBarHeaderSection from "./sidebar-header";
import SidebarContentSection from "./sidebar-content";

export function AppSidebar() {
  return (
    <Sidebar>
      <SideBarHeaderSection />

      <SidebarContentSection />

      <SidebarFooterSection />
    </Sidebar>
  );
}
