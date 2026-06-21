import express from "express";
import { Router } from "express";
import { HealthLiveController } from "./health.controller";
import {HealthReadyController} from "./health.controller";
const HealthRouter = Router();

HealthRouter.get("/live", HealthLiveController);
HealthRouter.get("/ready", HealthReadyController);

export {HealthRouter}