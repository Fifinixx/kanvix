import { NavMenuGroupType } from "../../../../shared/types";
import NavMenu from "./nav-menu";
import { SidebarGroup } from "@/components/ui/sidebar";

const groups: NavMenuGroupType = [
  {
    title: "Projects",
    url: "/projects",
    isActive: false,
    items: [{ title: "Web app development", url: "/53534n4", isActive: false }],
  },
  { title: "Settings", url: "/settings", isActive: false },
];
export default function NavGroup() {
  return groups.map((item) => {
    return (
      <SidebarGroup>
        <NavMenu menu={item} />
      </SidebarGroup>
    );
  });
}
