"use client";

import { useProject } from "@/app/application/context/project-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LucideTrash2 } from "lucide-react";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export function TaskDeleteDialog({
}) {
  const { deleteProject, selectedProject } = useProject();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <LucideTrash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and all your work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
          variant="destructive"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await deleteProject(selectedProject?.id || null);
              setLoading(false);
              setOpen(false);
            }}
          >
            {loading ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
