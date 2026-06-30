import { Request, Response, NextFunction } from "express";
import {
  CreateRefreshTokenService,
  RotateRefreshTokenService,
  SignInService,
  SignOutService,
  SignUpService,
} from "./auth.service";
import { GenerateAccessToken } from "../../lib/jwt.util";
import { GenerateRefreshToken, HashRefreshToken } from "../../lib/crypto.util";
import {
  ClearCookies,
  SetAccessTokenCookie,
  SetRefreshTokenCookie,
} from "../../lib/cookies.util";

import {
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from "../../lib/cookies.util";

export async function SignUpController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { insertedUser } = await SignUpService(req.body.data);
  const { id, ...user } = insertedUser;
  const accessToken = GenerateAccessToken(id);
  SetAccessTokenCookie(res, accessToken);

  const rawToken = GenerateRefreshToken();
  const hashedRefreshedToken = HashRefreshToken(rawToken);
  const formedRefreshToken = {
    userId: insertedUser.id,
    token: hashedRefreshedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
  };
  await CreateRefreshTokenService(formedRefreshToken);
  SetRefreshTokenCookie(res, rawToken);

  return res.status(200).json({
    message: "User registration succesful!",
    user: { ...user },
  });
}

export async function SignInController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const checkAuth = await SignInService(req.body.data);
  if (!checkAuth || !checkAuth.checkPassword) {
    return res.status(401).json({ message: "Incorrect username/password" });
  }
  const { id, ...user } = checkAuth.user;
  const accessToken = GenerateAccessToken(id);
  SetAccessTokenCookie(res, accessToken);

  const rawToken = GenerateRefreshToken();
  const hashedRefreshedToken = HashRefreshToken(rawToken);
  const formedRefreshToken = {
    userId: checkAuth.user.id,
    token: hashedRefreshedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
  };
  await CreateRefreshTokenService(formedRefreshToken);
  SetRefreshTokenCookie(res, rawToken);

  return res.status(200).json({
    message: "User signin succesful!",
    user: { ...user },
  });
}

export async function SignOutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(200).json({ message: "User is signed out succesfully!" });
  }
  ClearCookies(res); // clears cookies
  await SignOutService(refreshToken); // deletes from db
  return res.status(200).json({ message: "User is signed out succesfully!" });
}

export async function RotateRefreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("Refresh Cookie", req.cookies.refreshToken);
  const rawToken = req.cookies.refreshToken;

  if (!rawToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  const result = await RotateRefreshTokenService(rawToken);

  if (result === 401) {
    return res.status(401).json({ message: "No valid session found" });
  }

  res
    .cookie("refreshToken", result.newRefreshToken, REFRESH_COOKIE_OPTIONS)
    .cookie("accessToken", result.newAccessToken, ACCESS_COOKIE_OPTIONS);

  return res.status(200).json({ message: "Session validated." });
}
