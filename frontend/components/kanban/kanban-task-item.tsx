"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Trash2, MessageSquare, UserStar, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export function KanbanTaskItem() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      className={`overflow-hidden relative w-full max-w-xs ${!isExpanded ? "h-24" : ""}`}
    >
      <CardHeader className="w-full">
        <CardTitle>Fixed authentication issue</CardTitle>
        <CardDescription className="w-full"></CardDescription>
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          variant="link"
          className="cursor-pointer absolute -bottom-2 left-[50%] -translate-x-1/2"
        >
          <ChevronDown className="size-6" />
        </Button>
        <CardAction>
          <Button variant="destructive" className="cursor-pointer">
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex  justify-around items-center">
          <div className="flex flex-col">
            <p className="text-xs">Raised</p>
            <div className="flex justify-center items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center items-start">
                <p className="text-[10px]">Debmalya Maity</p>
                <p className="text-[10px]">27/03/2026</p>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <p className="text-xs">Closed</p>
            <div className="flex justify-center items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start">
                <p className="text-[10px]">Debmalya Maity</p>
                <p className="text-[10px]">27/03/2026</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            <span className="text-destructive font-semibold">Issue: </span>
            Sometimes signing in does not redirect the user to the application
            itself. Whenever a full reload is performed, and it works for some
            time. Its hit and miss. Doesn't work all the time.
          </p>
          <p>
            <span className="text-primary font-semibold">Fix: </span>
            NextJS caches routes and was causing cache poisoning, used a hard
            redirect and now its working fine.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 w-full">
        <Button type="button" className="w-1/2 cursor-pointer">
          <MessageSquare />
        </Button>
        <Button type="button" className="w-1/2 cursor-pointer">
          <UserStar />
        </Button>
      </CardFooter>
      <Separator />
    </Card>
  );
}
