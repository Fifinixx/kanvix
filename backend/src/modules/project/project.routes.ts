import express from "express";
import { ProjectAddController, ProjectDeleteController, ProjectFetchController, ProjectSwitchController } from "./project.controller";

const ProjectRouter = express.Router();

ProjectRouter.post("/add", ProjectAddController);
ProjectRouter.get("/:projId", ProjectFetchController);
ProjectRouter.patch("/", ProjectSwitchController)
ProjectRouter.delete("/:projId", ProjectDeleteController)
export {ProjectRouter};