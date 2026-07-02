"use client";

import { Bell, InfoIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "../ui/spinner";
import { useNotification } from "@/hooks/useNotification";


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
      <PopoverContent className="w-full rounded-2xl p-2 max-w-96">
        {!loading ? (
          notifications.map((item) => {
            return (
              <div
                key={item.id}
                className="flex text-primary justify-center items-center gap-2 p-2 bg-sidebar-accent"
              >
                <InfoIcon />
                {item.text}
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
