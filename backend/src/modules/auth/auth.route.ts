import { Router } from "express";
import {
  SignUpController,
  SignInController,
  SignOutController,
  RotateRefreshTokenController,
} from "./auth.controller";

import JwtValidateMiddleware from "../../middlewares/jwt.middleware";

export const AuthRouter = Router();

AuthRouter.post("/signup", SignUpController);
AuthRouter.post("/signin", SignInController);
AuthRouter.post("/signout", SignOutController);
AuthRouter.post("/refresh", RotateRefreshTokenController);
AuthRouter.get("/me",  JwtValidateMiddleware, (req, res) => {
  return res.status(200).json(req.user);
})

