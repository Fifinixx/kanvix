import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; 
    }
  }
}

export default function JwtValidateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const decodedJwt = jwt.verify(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
  );
  req.user = decodedJwt;
  next();
}
