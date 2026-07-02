import express from "express";
import { UpdateNotificationController } from "./user.controller";
import JwtValidateMiddleware from "../../middlewares/jwt.middleware";
import { FetchUserController } from "./user.controller";
import { FetchNotificationController } from "./user.controller";

export const UserRouter = express.Router();

UserRouter.patch(
  "/notifications",
JwtValidateMiddleware,
  UpdateNotificationController,
);
UserRouter.get("/notifications", JwtValidateMiddleware, FetchNotificationController);
UserRouter.get("/profile", JwtValidateMiddleware, FetchUserController);
