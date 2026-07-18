import express from "express";
import { ProjectAddController, ProjectFetchController, ProjectSwitchController } from "./project.controller";

const ProjectRouter = express.Router();

ProjectRouter.post("/add", ProjectAddController);
ProjectRouter.get("/:projId", ProjectFetchController);
ProjectRouter.patch("/", ProjectSwitchController)
export {ProjectRouter};