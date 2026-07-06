import express from "express";
import { OrganizationAddController } from "./organization.controller";
import JwtValidateMiddleware from "../../middlewares/jwt.middleware";

const OrganizationRouter = express.Router();

OrganizationRouter.post("/add", JwtValidateMiddleware, OrganizationAddController);



export {OrganizationRouter};