import express from "express";
import { ProjectAddController, ProjectFetchController } from "./project.controller";

const ProjectRouter = express.Router();

ProjectRouter.post("/add", ProjectAddController);
ProjectRouter.get("/:projId", ProjectFetchController);

export {ProjectRouter};