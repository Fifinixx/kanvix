"use client";
import { NotificationType } from "../../shared/types";
import { useState, useEffect, useOptimistic, startTransition } from "react";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FetchNotificationsApiService,
  UpdateNotificationsApiService,
} from "@/services/user.service";
import { notificationCounter } from "@/lib/utils";
import { useId } from "@/app/application/context/context";

export function useNotification() {
  const router = useRouter();
  const { id } = useId();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const [notificationCount, setNotificationCount] = useState<number>(0);

  const [optimisticNotificationCount, setOptimisticNotificationCount] =
    useOptimistic<number, number>(
      notificationCount,
      (currentState, newCount) => newCount,
    );

  async function routing(res: Response | 401) {
    if (res === 401) {
      router.replace("/auth");
      setLoading(false);
      return res;
    }
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message || "Error while fetching notifications");
      setLoading(false);
      return res;
    }
    return res;
  }
  async function fetchNotifications() {
    setLoading(true);
    if (id) {
      const res = await customFetch(() => FetchNotificationsApiService(id));
      const response = await routing(res);
      if (response === 401) return;
      const data = await response.json();
      setLoading(false);
      setNotifications(data.notifications);
      setNotificationCount(notificationCounter(data.notifications));
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  function updateNotifications() {
    if (!id) return;
    startTransition(async () => {
      try {
        setOptimisticNotificationCount(0);

        const res = await customFetch(() => UpdateNotificationsApiService(id));

        const response = await routing(res);
        if (response === 401) return;

        setNotificationCount(0);
      } catch (e) {
        console.warn("Notfication update failed. UI rolled back.");
      }
    });
  }

  return {
    loading,
    notifications,
    notificationCount,
    optimisticNotificationCount,
    updateNotifications,
  };
}
