import { Request, Response, NextFunction } from "express";
import {
  FetchUserService,
  FetchNotificationService,
  UpdateNotificationService,
} from "./user.service";

export async function FetchUserController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const fetchedUser = await FetchUserService(userId.id);
  if (!fetchedUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res
    .status(200)
    .json({ message: "User fetched succesfully", user: fetchedUser });
}

export async function FetchNotificationController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const fetchedUser = await FetchUserService(userId.id);
  if (!fetchedUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  const fetchedNotifications = await FetchNotificationService(userId.id);
  return res.status(200).json({message:"Notifications fetched succesfully!", notifications:fetchedNotifications})
}

export async function UpdateNotificationController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user as { id: string; iat: number; exp: number };
  if (!userId.id) {
    return res
      .status(400)
      .json({ message: "Invalid user!" });
  }
  await UpdateNotificationService(userId.id);
  return res.status(200).json({ message: "Notifications updated succesfully!" });
}
