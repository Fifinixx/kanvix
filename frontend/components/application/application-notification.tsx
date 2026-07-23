"use client";

import { Bell, InfoIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "../ui/spinner";
import { useNotification } from "@/app/application/context/notification-context";
import { formatPrismaDate } from "@/lib/utils";


export function ApplicationNotification() {
  const { loading, notifications, notificationCount, optimisticNotificationCount, updateNotifications } =
    useNotification();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative inline-flex cursor-pointer">
          <div className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            {optimisticNotificationCount}
          </div>
          <span
            onClick={() => {
              if (notificationCount > 0) {
                 updateNotifications();
              }
            }}
          >
            <Bell size={20} />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full  rounded-4xl p-4 max-w-104">
        {!loading ? (
          notifications.map((item) => {
            return (
              <div
                key={item.id}
                className="flex  justify-center items-center gap-4 p-2 bg-sidebar-accent"
              >
                <InfoIcon size={32}/>
                {item.text}
                <span className="text-xs text-neutral-500">{formatPrismaDate(item.createdAt)}</span>
              </div>
            );
          })
        ) : (
          <Spinner />
        )}
      </PopoverContent>
    </Popover>
  );
}
