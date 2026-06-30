import express from "express";
import { UpdateNotificationController } from "./user.controller";
import JwtValidateMiddleware from "../../middlewares/jwt.middleware";
import { FetchUserController } from "./user.controller";

export const UserRouter = express.Router();

UserRouter.patch(
  "/notification",
JwtValidateMiddleware,
  UpdateNotificationController,
);
UserRouter.get("/profile", JwtValidateMiddleware, FetchUserController);
