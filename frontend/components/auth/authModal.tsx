import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import SignUpForm from "./signup"

export default function AuthModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Open App</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle >Sign up</DialogTitle>
            <DialogDescription >
             Create a new account
            </DialogDescription>
          </DialogHeader>
            <SignUpForm />
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
