import express from "express";
import { ProjectAddController } from "./project.controller";
import JwtValidateMiddleware from "../../middlewares/jwt.middleware";

const ProjectRouter = express.Router();

ProjectRouter.post("/add",JwtValidateMiddleware, ProjectAddController);

export {ProjectRouter};