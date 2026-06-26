import { Request, Response } from "express";
export const REFRESH_COOKIE_OPTIONS = {
  path:'/',
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const ACCESS_COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
  maxAge: 15 * 60 * 1000,
};

export function SetAccessTokenCookie(res: Response, accessToken: string) {
  res.cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS);
}

export function SetRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
}

export function ClearCookies(res:Response){
      res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }).clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
;

}
