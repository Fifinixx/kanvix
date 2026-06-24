import { Router } from "express";
import {
  SignUpController,
  SignInController,
  SignOutController,
  RotateRefreshTokenController,
} from "./auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/signup", SignUpController);
AuthRouter.post("/signin", SignInController);
AuthRouter.post("/signout", SignOutController);
AuthRouter.post("/refresh", RotateRefreshTokenController)
