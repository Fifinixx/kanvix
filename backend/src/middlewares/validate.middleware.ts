import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export default function Validate(zodObject: z.ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validation = zodObject.parse(req.body.data);
    next();
  };
}
