import { Request, Response, NextFunction } from "express";
import { AuthSignInService } from "./auth.service";
import { AuthSignUpService } from "./auth.service";
export async function AuthSignUpController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const insertUser = await AuthSignUpService(req.body.data);
  return res
    .status(200)
    .json({ message: "User registration succesful!", user: insertUser });
}

export async function AuthSignInController(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
