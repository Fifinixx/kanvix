import { CheckCircle2Icon, InfoIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction,
} from "@/components/ui/alert";
import { Button } from "../ui/button";

export function ApplicationNotification() {
  return (
    <div className="absolute flex justify-center top-18 w-full">
      <Alert className=" max-w-lg">
        <CheckCircle2Icon />
        <AlertTitle>Organization created</AlertTitle>
        <AlertDescription>
          A default Organization with the name .... has been created for you.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" className="cursor-pointer" variant="default">
            Close
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
