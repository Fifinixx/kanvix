import express from "express";
import {
  OrganizationAddController,
  OrganizationFetchController,
  OrganizationSwitchController,
} from "./organization.controller";

const OrganizationRouter = express.Router();

OrganizationRouter.get("/:orgId", OrganizationFetchController);
OrganizationRouter.post("/add",  OrganizationAddController);
OrganizationRouter.patch("/switch", OrganizationSwitchController);

export { OrganizationRouter };
