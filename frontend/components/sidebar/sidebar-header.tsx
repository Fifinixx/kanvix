"use client";

import { ChevronsUpDown, Plus, Building2, Briefcase } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganization } from "@/app/application/context/organization-context";
import { SidebarHeaderSkeleton } from "./sidebar-header-skeleton";
import { useUser } from "@/app/application/context/user-context";

export default function SideBarHeaderSection() {
   const {
    memberships,
    selectedOrganizationId,
    selectedOrganization,
     switchOrganization,
    addOrganization,
    fetchUser,
    organizationInput,
    setOrganizationInput,
    loadingOrg,
   } = useOrganization();


  const [isModalOpen, setIsModalOpen] = useState(false);
  if (loadingOrg) return <SidebarHeaderSkeleton />;
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                      <Building2 className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {selectedOrganization?.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {
                          memberships?.find(
                            (item) => item.orgId === selectedOrganizationId,
                          )?.role
                        }
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
                    Organizations
                  </DropdownMenuLabel>
                  {memberships?.map((membership, index) => (
                    <DropdownMenuItem
                      key={membership.org.id}
                      onClick={() => switchOrganization(membership.org.id)}
                      className="gap-2 p-2 cursor-pointer"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <Building2 className="size-4 shrink-0" />
                      </div>
                      {membership.org.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                      </div>

                      <div className="font-medium text-muted-foreground">
                        Add Organization
                      </div>
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a new Organization</DialogTitle>
            <DialogDescription>
              Set up a new organization to manage your projects and tasks.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={organizationInput.name}
                onChange={(e) =>
                  setOrganizationInput((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button
              type="button"
              disabled={organizationInput.loading}
              onClick={async () => {
                await addOrganization();
                setIsModalOpen(false);
                await fetchUser();
              }}
            >
              {organizationInput.loading ? <Spinner /> : "Add"}
            </Button>
            <Button type="button">Add and switch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
