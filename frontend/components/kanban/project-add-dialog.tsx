"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "../ui/spinner";
import { useProject } from "@/app/application/context/project-context";


export function ProjectAddDialog() {
  const { addProject } = useProject();
  const [projectName, setProjectName] = useState({ name: "", loading: false });
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>Create a Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
          <DialogDescription>
            Create a new project to track your work.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              value={projectName.name}
              onChange={(e) =>
                setProjectName((prev) => ({ ...prev, name: e.target.value }))
              }
              id="name"
              name="name"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="outline" type="button">
            Add and switch
          </Button>
          <Button
            disabled={projectName.loading}
            onClick={async () => {
              setProjectName({ name: "", loading: true });
              await addProject(projectName.name);
              setProjectName({ name: "", loading: false });
              setOpenDialog(false);
            }}
            type="button"
          >
            {projectName.loading ? <Spinner /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
