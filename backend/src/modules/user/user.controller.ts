import { Request, Response, NextFunction } from "express";
import { FetchUserService, UpdateNotificationService } from "./user.service";
export async function UpdateNotificationController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { notificationId, read } = req.body.data;
  if (!notificationId || read) {
    return res
      .status(400)
      .json({ message: "Invalid details provided for notification" });
  }
  await UpdateNotificationService(notificationId, read);
  return res.status(200).json({ message: "Notification updated succesfully!" });
}
export async function FetchUserController(req: Request, res: Response) {
  const userId = req.user as {id:string, iat: number, exp:number};
  const fetchedUser = await FetchUserService(userId.id);
  if (!fetchedUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res
    .status(200)
    .json({ message: "User fetched succesfully", user: fetchedUser });
}
