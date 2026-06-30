"use client";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Settings, MoreVertical, User, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useId } from "@/app/application/context/context";
import { useEffect, useState } from "react";
import { FetchUserService } from "@/services/user.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { type UserType } from "../../../shared/types";
import { SidebarFooterSkeleton } from "./sidebar-footer-skeleton";

export default function SidebarFooterSection() {
  const router = useRouter();
  const { handleSignOut } = useUserAuth();
  const { id, setId } = useId();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  async function fetchUser(){
    setLoading(true);
    if(id) {
      const res = await customFetch(() => FetchUserService(id));
      if(res === 401){
        router.replace("/auth");
        setLoading(false);
        return;
      }
      if(!res.ok){
        const data = await res.json();
        toast.error(data.message || "Error while fetching user");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])
  if(loading) return <SidebarFooterSkeleton />
  return (
   <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/debmalya.jpg" alt="Debmalya" />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {(user?.firstName
                      ? user.firstName[0]
                      : "") +( user?.lastName
                        ? user?.lastName[0]
                        : "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.firstName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
                <MoreVertical className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              className="w-50 rounded-lg"
            >
              <DropdownMenuItem asChild>
                <a href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleSignOut}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
