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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "./ui/spinner";
import { useProject } from "@/app/application/context/project-context";
import { Textarea } from "./ui/textarea";

export function ProjectAddDialog() {
  const {
    addProject,
    projects,
    projectInput,
    handleSetInputProject,
    handleAddProject,
    dialog,
    setDialog,
  } = useProject();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create a Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form
            onSubmit={async (e) => {
              await handleAddProject(e);
              setOpen(false);
            }}
          >
            <DialogHeader>
              <DialogTitle>Add a new project</DialogTitle>
              <DialogDescription>
                Create a new project to track your work.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  required
                  value={projectInput.name}
                  onChange={handleSetInputProject}
                  id="name"
                  name="name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Description</FieldLabel>
                <Textarea
                  required
                  value={projectInput.description}
                  onChange={(e) => handleSetInputProject(e)}
                  id="description"
                  name="description"
                  maxLength={200}
                  minLength={10}
                />
                <span
                  className={`${projectInput.description.length === 200 ? "text-destructive" : ""}`}
                >{`${projectInput.description.length}/200`}</span>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={projectInput.loading} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              {projects?.length && projects?.length > 0 ? (
                <Button
                  disabled={projectInput.loading}
                  variant="outline"
                  type="submit"
                >
                  Add and switch
                </Button>
              ) : (
                ""
              )}
              <Button disabled={projectInput.loading} type="submit">
                {projectInput.loading ? <Spinner /> : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
