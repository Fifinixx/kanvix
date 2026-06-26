import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { type NavMenuType } from "../../../shared/types";
import Link from "next/link";

export default function NavMenu({ menu }: { menu: NavMenuType }) {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={menu.url}>{menu.title}</Link>
          {menu.items?.length
            ? menu.items.map((sub) => {
                return (
                  <SidebarMenuSubItem key={sub.title}>
                    <Link href={sub.url}>{sub.title}</Link>
                  </SidebarMenuSubItem>
                );
              })
            : ""}
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
