import { Router } from "express";
import {
  AuthSignUpController,
  AuthSignInController,
  AuthSignOutController,
} from "./auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/signup", AuthSignUpController);
AuthRouter.post("/signin", AuthSignInController);
AuthRouter.post("/signout", AuthSignOutController);
AuthRouter.post("/refresh", () => {})
