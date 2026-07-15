import express from "express";
import { ProjectAddController } from "./project.controller";

const ProjectRouter = express.Router();

ProjectRouter.post("/add", ProjectAddController);

export {ProjectRouter};