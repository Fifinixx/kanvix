import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NotificationType } from "../../shared/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function notificationCounter(
  notifications:NotificationType[]
){
  const count = notifications.reduce((acc, item) => {
    return item.read === false ? acc += 1 : acc 
  }, 0)

  return count;
}