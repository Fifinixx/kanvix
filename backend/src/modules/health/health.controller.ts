import { Request, Response, NextFunction } from "express";
import { HealthReadyService } from "./health.service";
import { HealthLiveService } from "./health.service";

export  async function HealthLiveController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const health = await HealthLiveService();
  res.status(200).json({ message: health });
}


export  async function HealthReadyController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const health = await HealthReadyService();
  const statusCode = health.database === "healthy" ? 200 : 503;
  res.status(statusCode).json(health);
}
