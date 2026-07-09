import express from "express";
import {
  OrganizationAddController,
  OrganizationFetchController,
  OrganizationSwitchController,
} from "./organization.controller";
import JwtValidateMiddleware from "../../middlewares/jwt.middleware";

const OrganizationRouter = express.Router();

OrganizationRouter.post(
  "/add",
  JwtValidateMiddleware,
  OrganizationAddController,
);
OrganizationRouter.post(
  "/fetch",
  JwtValidateMiddleware,
  OrganizationFetchController,
);

OrganizationRouter.put("/switch", JwtValidateMiddleware, OrganizationSwitchController);

export { OrganizationRouter };
