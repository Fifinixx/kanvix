import { Router } from "express";
import { AuthSignUpController, AuthSignInController } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", AuthSignUpController);
AuthRouter.get("/signup", AuthSignInController);