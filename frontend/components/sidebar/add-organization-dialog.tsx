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

export function AddOrganizationModal({
  organizationInput,
  setOrganizationInput,
  addOrganization,
}: {
  organizationInput: { name: string; loading: boolean };
  setOrganizationInput: React.Dispatch<
    React.SetStateAction<{
      name: string;
      loading: boolean;
    }>
  >;
  addOrganization: () => Promise<void>;
}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <div className="font-medium text-muted-foreground">
            Add Organization
          </div>
        </DialogTrigger>
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
                onChange={(e) => setOrganizationInput(prev => ({...prev, name:e.target.value}))}
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
              onClick={addOrganization}
            >
              {organizationInput.loading ? <Spinner /> : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
