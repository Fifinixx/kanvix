import { Request, Response, NextFunction } from "express";
import {
  CreateRefreshTokenService,
  SignInService,
  SignOutService,
  SignUpService 
} from "./auth.service";
import { GenerateAccessToken } from "../../lib/jwt.util";
import { GenerateRefreshToken, HashRefreshToken } from "../../lib/crypto.util";
import {
  ClearCookies,
  SetAccessTokenCookie,
  SetRefreshTokenCookie,
} from "../../lib/cookies.util";

export async function AuthSignUpController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
    console.log(req.body)
  const insertedUser = await SignUpService(req.body.data);

  const accessToken = GenerateAccessToken({
    id: insertedUser.id,
    email: insertedUser.email,
  });
  SetAccessTokenCookie(res, accessToken);

  const rawToken = GenerateRefreshToken();
  const hashedRefreshedToken = HashRefreshToken(rawToken);
  const formedRefreshToken = {
    userId: insertedUser.id,
    tokenHash: hashedRefreshedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
  };
  CreateRefreshTokenService(formedRefreshToken);
  SetRefreshTokenCookie(res, rawToken);

  return res.status(200).json({
    message: "User registration succesful!",
    user: { id: insertedUser.id, email: insertedUser.email },
    accessToken,
    rawToken,
  });
}

export async function AuthSignInController(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

export async function AuthSignOutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const refreshToken = req.cookies?.refreshToken;
  ClearCookies(res); // clears cookies
  if (!refreshToken) {
    return res.status(200).json({ message: "User is signed out succesfully!" });
  }
  await SignOutService(refreshToken); // deletes from db
  return res.status(200).json({ message: "User is signed out succesfully!" });
}

export async function AuthRefreshController(req:Request, res:Response, next:NextFunction){
    
}
