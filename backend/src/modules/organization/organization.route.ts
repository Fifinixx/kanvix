import express from "express";
import {
  OrganizationAddController,
  OrganizationFetchController,
  OrganizationSwitchController,
} from "./organization.controller";

const OrganizationRouter = express.Router();

OrganizationRouter.post(
  "/add",
  OrganizationAddController,
);
OrganizationRouter.post(
  "/fetch",
  OrganizationFetchController,
);

OrganizationRouter.put("/switch", OrganizationSwitchController);

export { OrganizationRouter };
