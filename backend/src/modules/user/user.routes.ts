import express from "express";
import {
  UserFetchController,
  NotificationUpdateController,
  NotificationFetchController,
} from "./user.controller";

export const UserRouter = express.Router();

UserRouter.patch("/notifications", NotificationUpdateController);
UserRouter.get("/notifications", NotificationFetchController);
UserRouter.get("/profile", UserFetchController);
