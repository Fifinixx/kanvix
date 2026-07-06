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

export function formatPrismaDate(dateInput: Date | string): string {
  const date = new Date(dateInput);

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}